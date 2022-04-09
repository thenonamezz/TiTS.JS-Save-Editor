//i initially meant this to run every time the editor was opened to get the latest stuff BUT:
// a. would need a server or some kind of hosting for node
// b. would require time to learn the basics because i have no expierence with node
// c. would take quite a bit of time to load everything in, and that's every time the page is loaded (again, no server to work with)
// d. would still mean "hardcoded" values need to be used if and when an offline version is released

const puppeteer = require('puppeteer');
const prettier = require('prettier');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let urls = [];
    let contents = [];
    page.on('response', async (response) => {
        const url = response.url();
        if (url.endsWith('.js')) {
            urls.push(url);
            contents.push(await response.text());
        }
    });

    try {
        console.log('loading game');
        await page.goto('https://www.fenoxo.com/play/TiTS/release/', { timeout: 0 });
        console.log('game loaded');
    }
    catch (err) {
        console.log(err);
        await browser.close();
        return;
    }

    console.log('urls', urls);

    let obj;
    try {
        console.log('beginning scrape');
        obj = await page.evaluate(() => {
            let log = '';
            function start(msg) { log += msg + '\n' }

            try {
                function getObjectRecursive(theObject, keyName) {
                    var result = null;
                    if (theObject instanceof Array) {
                        for (var i = 0; i < theObject.length; i++) {
                            result = getObjectRecursive(theObject[i]);
                        }
                    }
                    else {
                        for (var prop in theObject) {
                            if (prop == keyName) {
                                return theObject[keyName];
                            }
                            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array)
                                result = getObjectRecursive(theObject[prop]);
                        }
                    }
                    return result;
                }

                function getValidFlagsFor(bodyPart, bodyFlagArr) {
                    var validFlags = [];
                    var propName = 'VALID_' + bodyPart + '_FLAGS';
                    var flagArr = getObjectRecursive(window.GLOBAL, propName);
                    for (var i = 0; i < flagArr.length; i++) {
                        validFlags.push(bodyFlagArr.find(f => f.value == flagArr[i]));
                    }
                    return validFlags;
                }

                function getValidTypesFor(bodyPart, bodyPartArr) {
                    var validTypes = [];
                    var propName = 'VALID_' + bodyPart + '_TYPES';
                    var typeArr = getObjectRecursive(window.GLOBAL, propName);
                    for (var i = 0; i < typeArr.length; i++) {
                        validTypes.push(bodyPartArr.find(f => f.value == typeArr[i]));
                    }
                    return validTypes;
                }

                function getGlobalsByPrefix(prefix) {
                    return Object.keys(window.GLOBAL)
                        .filter(key => key.startsWith(prefix))
                        .sort(key => window.GLOBAL[key])
                        .map(key => ({
                            name: key.slice(prefix.length)
                                .split('_')
                                .map(str => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()).join(' '),
                            value: window.GLOBAL[key]
                        }));
                }

                //function getName(obj) {
                //    return getMemberValue(obj, ['name', '_name']).replace(/(^\w|\s\w)/g, m => m.toUpperCase());
                //}

                // function getDesc(obj) {
                //     return getMemberValue(obj, ['desc', 'description', '_desc', '_description']);
                // }

                //function getMemberValue(obj, keys) {
                //    for (const key of keys)
                //        if (key in obj)
                //            return typeof obj[key] === 'function' ? obj[key]() : obj[key];
                //}

                //start('Getting items');
                //const items = [];
                //const items = Object.keys(window.ITEMS).map(key => [key, new window.ITEMS[key]()]);
                //function getItemsByType(type, attr) {
                //    const filtered = items.filter(tuple => tuple[1].type === type);
                //    if (!attr)
                //        return processArr(filtered.map(tuple => ({ name: getName(tuple[1]), value: tuple[0] })));
                //    else
                //        return processArr(filtered.map(tuple => ({ name: getName(tuple[1]), value: tuple[0], attr })));
                //}

                //function processArr(arr) {
                //    fixMissingNames(arr);
                //    renameDups(arr);
                //    fixNamesForDisplay(arr);
                //    return arr;
                //}

                //function fixMissingNames(arr) {
                //    for (let index = 0; index < arr.length; index++) {
                //        const info = arr[index];
                //        if (!info.name) info.name = info.value;
                //    }
                //}

                //function compareNameValue(name, value) {
                //    return name.toLowerCase().replace(/ /g, '').trim() === value.toLowerCase().replace(' ', '').trim();
                //}

                //function renameDups(arr) {
                //    for (let index = 0; index < arr.length; index++) {
                //        const info = arr[index];
                //        const dups = arr.filter(item => item.name === info.name);
                //        if (dups.length > 1) {
                //            let base = dups.find(item => compareNameValue(item.name, item.value));

                //            for (let dupIndex = 0; dupIndex < dups.length; dupIndex++) {
                //                const dupInfo = dups[dupIndex];
                //                if (!base || (base && base !== dupInfo))
                //                    dupInfo.name = dupInfo.value;
                //            }
                //        }
                //    }
                //}

                //function fixNamesForDisplay(arr) {
                //    for (let index = 0; index < arr.length; index++) {
                //        const info = arr[index];
                //        info.name = info.name[0].toLocaleUpperCase() + info.name.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2').trim();
                //    }
                //}

                //function getThingFromWindow(name, ...args) {
                //    return processArr(Object.keys(window[name]).map(key => {
                //        const thing = new window[name][key](...args);
                //        return { name: getName(thing) || key, value: key }
                //    }));
                //}

                start('Generating globals');
                let globalsObj;
                {
                    start('getting classes');
                    const Class = getGlobalsByPrefix('CLASS_');

                    start('getting body flags');
                    const BodyFlag = getGlobalsByPrefix('FLAG_');

                    start('getting body types');
                    const BodyType = getGlobalsByPrefix('TYPE_');

                    start('getting tail genitals');
                    const TailGenital = getGlobalsByPrefix('TAIL_GENITAL_');

                    start('getting skin types');
                    const SkinType = getGlobalsByPrefix('SKIN_TYPE_');

                    start('getting nipple types');
                    const NippleType = getGlobalsByPrefix('NIPPLE_TYPE_');

                    start('getting fluid types');
                    const FluidType = getGlobalsByPrefix('FLUID_TYPE_');

                    start('getting hair types');
                    const HairType = getGlobalsByPrefix('HAIR_TYPE_');

                    start('getting genital positions');
                    const GenitalSpot = getGlobalsByPrefix('GENITAL_SPOT_');

                    start('getting item flags');
                    const ItemFlag = getGlobalsByPrefix('ITEM_FLAG_');

                    start('getting sexprefs');
                    const SexPref = getGlobalsByPrefix('SEXPREF_');

                    start('getting valid body flags');
                    const ValidFlags =
                    {
                        Face: getValidFlagsFor("FACE", BodyFlag),
                        Tongue: getValidFlagsFor("TONGUE", BodyFlag),
                        Arm: getValidFlagsFor("ARM", BodyFlag),
                        Leg: getValidFlagsFor("LEG", BodyFlag),
                        Tail: getValidFlagsFor("TAIL", BodyFlag),
                        Skin: getValidFlagsFor("SKIN", BodyFlag)
                    };

                    start('getting valid body types');
                    const ValidTypes =
                    {
                        Face: getValidTypesFor("FACE", BodyType),
                        Eye: getValidTypesFor("EYE", BodyType),
                        Tongue: getValidTypesFor("TONGUE", BodyType),
                        Ear: getValidTypesFor("EAR", BodyType),
                        Arm: getValidTypesFor("ARM", BodyType),
                        Leg: getValidTypesFor("LEG", BodyType),
                        Antennae: getValidTypesFor("ANTENNAE", BodyType), //kinda random but according to the game "human" is a valid antennae type????
                        Horn: getValidTypesFor("HORN", BodyType),
                        Wing: getValidTypesFor("WING", BodyType),
                        Tail: getValidTypesFor("TAIL", BodyType)
                    };

                    //todo stuff

                    globalsObj = {
                        Class, BodyFlag, BodyType, TailGenital, SkinType, NippleType, FluidType, HairType, GenitalSpot, ItemFlag, SexPref,
                        ValidFlags, ValidTypes
                    };
                }

                start('stringifying global');
                const globals = JSON.stringify(globalsObj);

                // Pregnancy flags
                //start('Generating pregnancy flag keys');
                //const pregFlagKeys = Object.keys(window.GLOBAL)
                //    .filter(key => key.startsWith('PREG_'))
                //    .map(key => window.GLOBAL[key])
                //    .filter(key => key)
                //    .sort(key => window.GLOBAL[key]);

                // Command for serializing important chars
                //start('Generating character defaults');
                //const charDefaults = [];
                //const charDefaults = JSON.stringify(Object.keys(window.CHARS)
                //    .filter(name => name !== 'champ')
                //    .reduce((obj, name) => {
                //        obj[name] = (new window.CHARS[name].constructor()).serialize();
                //        return obj;
                //    }, {})
                //);

                //return { globals, pregFlagKeys, charDefaults, log };
                return { globals, log };
            }
            catch (err) {
                return { log, err: err + '' };
            }
        });
        console.log('completed scrape');
    }
    catch (err) {
        console.log(err);
        await browser.close();
        return;
    }

    console.log(obj.log);

    if (obj.err) {
        console.log('Error:' + obj.err + '');
        await browser.close();
        return;
    }

    console.log('getting flags');

    var list = [];
    for (var index = 0; index < contents.length; ++index) {
        var content = contents[index];
        var matches = content.match(/flags\.[\w_]+/g);
        if (matches && matches.length > 0) {
            list = list.concat(matches.map((value) => value.substr(6)));
        }
        var matches = content.match(/flags\[['"][\w_]+['"]\]/g);
        if (matches && matches.length > 0) {
            list = list.concat(matches.map((value) => value.substr(7, value.length - 2)));
        }
        var matches = content.match(/incFlags\('[\w_]+/g);
        if (matches && matches.length > 0) {
            list = list.concat(matches.map((value) => value.substr(10)));
        }
    }

    //const expandedPregFlags = [];
    //for (const flag of obj.pregFlagKeys) {
    //    expandedPregFlags.push(flag + '_TIMER');
    //    expandedPregFlags.push(flag + '_EGG_LAID');
    //    expandedPregFlags.push(flag + '_NUM_BIRTHS');
    //    expandedPregFlags.push(flag + '_NUM_KIDS');
    //}

    //list = list.concat(
    //    expandedPregFlags,
    //    [
    //        'HORNET_PC_PREG_EGGS',
    //        'GWYN_PREG_LITTER',
    //        'WYVERN_PREG_BAB',
    //        'WYVERN_PREG_GOT_EGG',
    //        'OVILIXER_PC_PREG_BAB',
    //        'OVILIXER_PC_PREG_OVIP',
    //        'LUPINE_PC_PREG_LITTER',
    //        'LUPINE_PC_PREG_GARRET',
    //        'LUPINE_PC_PREG_GARRET_TOTAL',
    //        'BRINT_PC_PREG_TALKED',
    //        'BRINT_PC_PREG_LITTER',
    //    ]
    //);

    list = list
        .filter((value, index, self) => self.indexOf(value) === index && value.toUpperCase() === value)
        .sort();

    console.log('retrieved flags');

    const format = str => prettier.format(str, { parser: 'babel', tabWidth: 4 });
    //const asConst = str => str.slice(0, str.length - 2) + ' as const' + str.slice(str.length - 2);

    console.log('writing to file');
    fs.writeFileSync('global.js', format('const globalKeys = ' + obj.globals));
    fs.writeFileSync('flags.js', format('const Flags = ' + JSON.stringify(list)));
    console.log('finito');

    await browser.close();
})();