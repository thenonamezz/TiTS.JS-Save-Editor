const instance = 'save.gameInstanceInfo';
const char = 'selectedCharacter().obj';
const pc = 'save.characters.PC';
const butt = char + '.ass';
const flags = 'save.flags';

function displayGame() {
    return new Tab([
        new Row([
            new Group('Internal', [
                new TextField(flags, 'PC_EMAIL_ADDRESS', 'E-Mail', null, 'emailChanged'),
                new TextField(instance, 'note', 'Note'),
                new IntegerField('save', 'days', 'Days', 'days', 0),
                new IntegerField('save', 'hours', 'Hours', 'hours', 0, 23),
                new IntegerField('save', 'minutes', 'Minutes', 'minutes', 0, 59),
            ]),
            new Group('Game Settings', [
                new SwitchField('save', 'easyMode', 'Easy Mode'),
                new SwitchField('save', 'sillyMode', 'Silly Mode'),
                new SwitchField(instance, 'miniMapVisible', 'Minimap visible'),
                new SwitchField(instance, 'minimapRolledOut', 'Minimap rolled out'),
                new SwitchField(instance, 'bustRolledOut', 'Bust rolled out'),
                new SwitchField(instance, 'dateTimeVisible', 'Date and Time visible')
            ])
        ])
    ]);
}

function displayStats() {
    return new Tab([
        new Row([
            new Group('General', [
                new TextField(char, 'short', 'Name', null, 'nameChanged'),
                new IntegerField(char, 'credits', 'Credits', null, 0),
                new IntegerField(char, 'personality', 'Personality', null, 0, 100),
                new IntegerField(char, 'exhibitionismRaw', 'Exhibitionism', null, 0, 100)
            ]),
            new Group('Advancement', [
                new IntegerField(char, 'level', 'Level', null, 0, 10),
                new IntegerField(pc, 'XPRaw', 'XP', null, 0, null, null, true),
                new IntegerField(pc, 'unspentStatPoints', 'Stat Points', null, 0, null, null, true)
            ]),
            new Group('Appearance', [
                new IntegerField(char, 'tallness', 'Height', 'inches', 0),
                new IntegerField(char, 'thickness', 'Thickness', null, 0, 100),
                new IntegerField(char, 'tone', 'Tone', null, 0, 100),
                new IntegerField(char, 'femininity', 'Femininity', null, 0, 100)
            ]),
        ]),
        new Row([
            new Group('Core', [
                new NestedGroup('', [
                    new FloatField(char, 'Internal_aimRaw', 'Aim Raw', null, 0),
                    new IntegerField(char, 'aimMod', 'Aim Mod', null, 0),
                ]),
                new NestedGroup('', [
                    new FloatField(char, 'Internal_intelligenceRaw', 'Intelligence Raw', null, 0),
                    new IntegerField(char, 'intelligenceMod', 'Intelligence Mod', null, 0),
                ]),
                new NestedGroup('', [
                    new FloatField(char, 'Internal_physiqueRaw', 'Physique Raw', null, 0),
                    new IntegerField(char, 'physiqueMod', 'Physique Mod', null, 0),
                ]),
                new NestedGroup('', [
                    new FloatField(char, 'Internal_reflexesRaw', 'Reflexes Raw', null, 0),
                    new IntegerField(char, 'reflexesMod', 'Reflexes Mod', null, 0),
                ]),
                new NestedGroup('', [
                    new FloatField(char, 'Internal_willpowerRaw', 'Willpower Raw', null, 0),
                    new IntegerField(char, 'willpowerMod', 'Willpower Mod', null, 0),
                ]),
                new NestedGroup('', [
                    new FloatField(char, 'Internal_libidoRaw', 'Libido Raw', null, 0, 100),
                    new IntegerField(char, 'libidoMod', 'Libido Mod', null, 0, 100),
                ]),
                new NestedGroup('', [
                    new FloatField(char, 'Internal_taintRaw', 'Taint Raw', null, 0, 100),
                    new IntegerField(char, 'taintMod', 'Taint Mod', null, 0, 100)
                ])
            ]),
            new Group('Combat', [
                new NestedGroup('', [
                    new IntegerField(char, 'HPRaw', 'HP Raw', null, 0),
                    new IntegerField(char, 'HPMod', 'HP Mod', null, 0)
                ]),
                new NestedGroup('', [
                    new IntegerField(char, 'energyRaw', 'Energy Raw', null, 0),
                    new IntegerField(char, 'energyMod', 'Energy Mod', null, 0)
                ]),
                new NestedGroup('', [
                    new IntegerField(char, 'lustRaw', 'Lust Raw', null, 0, 100),
                    new IntegerField(char, 'lustMod', 'Lust Mod', null, 0)
                ]),
                new IntegerField(char, 'shieldsRaw', 'Shields Raw', null, 0)
            ]),
        ]),
    ]);
}

function displayHead() {
    return new Tab([
        new Row([
            new Group('Head', [
                new SelectField('ValidTypes.Antennae', char, 'antennaeType', 'Antennae Type'),
                new IntegerField(char, 'antennae', 'Antennae Count', null, 0),
                new SelectField('ValidTypes.Horn', char, 'hornType', 'Horn Type'),
                new IntegerField(char, 'horns', 'Horn Count', null, 0),
                new FloatField(char, 'hornLength', 'Horn Length', 'inches', 0)
            ]),
            new Group('Hair', [
                new SelectField('HairType', char, 'hairType', 'Hair Type'),
                new FloatField(char, 'hairLength', 'Hair Length', 'inches', 0),
                new TextField(char, 'hairColor', 'Hair Color'),
                new SelectField('HairStyle', char, 'hairStyle', 'Hair Style',),
                new FloatField(char, 'beardLength', 'Beard Length', 'inches', 0),
                new SelectField('HairType', char, 'beardType', 'Beard Type'),
                // todo beard style - From old creator, i have no plans for this
            ])
        ]),
        new Row([
            new Group('Face', [
                new SelectField('ValidTypes.Face', char, 'faceType', 'Face Type'),
                new FlagField('ValidFlags.Face', char, 'faceFlags', 'Face Flags')
            ]),
            new Group('Tongue', [
                new SelectField('ValidTypes.Tongue', char, 'tongueType', 'Tongue Type'),
                new FlagField('ValidFlags.Tongue', char, 'tongueFlags', 'Tongue Flags')
            ])
        ]),
        new Row([
            new Group('Lips', [
                new TextField(char, 'lipColor', 'Lip Color'),
                new IntegerField(char, 'lipMod', 'Lip Mod', null, 0)
            ]),
            new Group('Ears', [
                new SelectField('ValidTypes.Ear', char, 'earType', 'Ear Type'),
                new FloatField(char, 'earLength', 'Ear Length', 'inches', 0),
                new FlagField('ValidFlags.Ear', char, 'earFlags', 'Ear Flag'),
            ]),
            new Group('Eyes', [
                new SelectField('ValidTypes.Eye', char, 'eyeType', 'Eye Type'),
                new TextField(char, 'eyeColor', 'Eye Color')
            ])
        ])
    ]);
}

function displayBody() {
    return new Tab([
        new Row([
            new Group('General', [
                new SwitchField(char, 'gills', 'Has Gills'),
                new FloatField(char, 'elasticity', 'Elasticity', null, 0),
                new SelectField('GenitalSpot', char, 'genitalSpot', 'Genital Spot'),
                new NestedGroup('', [
                    new IntegerField(char, 'hipRatingRaw', 'Hip Rating Raw', null, 0),
                    new IntegerField(char, 'hipRatingMod', 'Hip Rating Mod', null, 0),
                ]),
                new NestedGroup('', [
                    new IntegerField(char, 'buttRatingRaw', 'Butt Rating Raw', null, 0),
                    new IntegerField(char, 'buttRatingMod', 'Butt Rating Mod', null, 0)
                ]),
                new NestedGroup('', [
                    new IntegerField(char, 'bellyRatingRaw', 'Belly Rating Raw', null, 0),
                    new IntegerField(char, 'bellyRatingMod', 'Belly Rating Mod', null, 0)
                ]),
                new SelectField('Utility', char + ".inventory.equippedImplants", 'utilityImplant', 'Utility implant',null,0,"getImplant"),
            ]),
            new Group('Skin', [
                new SelectField('SkinType', char, 'skinType', 'Skin Type'),
                new TextField(char, 'skinTone', 'Skin Tone'),
                new TextField(char, 'skinAccent', 'Skin Accent'),
                new TextField(char, 'furColor', 'Fur Color'),
                new TextField(char, 'scaleColor', 'Scale Color'),
                new FlagField('ValidFlags.Skin', char, 'skinFlags', 'Skin Flag'),
            ])
        ]),
        new Row([
            new Group('Wings', [
                new SelectField('ValidTypes.Wing', char, 'wingType', 'Wing Type'),
                new IntegerField(char, 'wingCount', 'Wing Count', null, 0)
            ]),
            new Group('Arms', [
                new SelectField('ValidTypes.Arm', char, 'armType', 'Arm Type'),
                new FlagField('ValidFlags.Arm', char, 'armFlags', 'Arm Flags')
            ]),
            new Group('Legs', [
                new SelectField('ValidTypes.Leg', char, 'legType', 'Leg Type'),
                new IntegerField(char, 'legCount', 'Leg Count', null, 0),
                new FlagField('ValidFlags.Leg', char, 'legFlags', 'Leg Flags')
            ])
        ]),
        new Row([
            new Group('Butt', [
                new SwitchField(char, 'analVirgin', 'Anal Virgin'),
                new IntegerField(butt, 'minLooseness', 'Min Looseness', null, 0),
                new IntegerField(butt, 'bonusCapacity', 'Bonus Capacity', null, 0),
                new FlagField('ValidFlags.Ass', butt, 'flags', 'Ass Flags'),
                new NestedGroup('', [
                    new IntegerField(butt, 'loosenessRaw', 'Looseness Raw', null, 0),
                    new IntegerField(butt, 'loosenessMod', 'Looseness Mod', null, 0)
                ]),
                new NestedGroup('', [
                    new IntegerField(butt, 'wetnessRaw', 'Wetness Raw', null, 0),
                    new IntegerField(butt, 'wetnessMod', 'Wetness Mod', null, 0)
                ])
            ]),
            new Group('Tail', [
                new SelectField('ValidTypes.Tail', char, 'tailType', 'Tail Type'),
                new IntegerField(char, 'tailCount', 'Tail Count', null, 0),
                new IntegerField(char, 'tailVenom', 'Tail Venom', null, 0, 100),
                new IntegerField(char, 'tailRecharge', 'Tail Recharge', null, 0),
                new FlagField('ValidFlags.Tail', char, 'tailFlags', 'Tail Flags'),
                new ReadOnlyTextField("Only applicable when 'Tailcock' and 'Tailcunt' flag is set to on, on the tail"),
                new AccordionGroup("Tailcock", [
                    new NestedGroup('', [
                        new FloatField(char + ".tailCock", 'cLengthRaw', 'Length Raw', null, 0),
                        new FloatField(char + ".tailCock", 'cLengthMod', 'Length Mod', null, 0),
                    ]),
                    new NestedGroup('', [
                        new FloatField(char + ".tailCock", 'cThicknessRatioRaw', 'Thickness Ratio Raw', null, 0),
                        new FloatField(char + ".tailCock", 'cThicknessRatioMod', 'Thickness Ratio Mod', null, 0),
                    ]),
                    new SelectField('ValidTypes.TailGenital', char + ".tailCock", 'cType', 'Type'),
                    new TextField(char + ".tailCock", 'cockColor', 'Color'),
                    new FloatField(char + ".tailCock", 'knotMultiplier', 'Knot Multiplier', null, 0),
                    new FloatField(char + ".tailCock", 'flaccidMultiplier', 'Flaccid Multiplier', null, 0),
                    new SwitchField(char + ".tailCock", 'virgin', 'Virgin'),
                    new FlagField('ValidFlags.Cock', char + ".tailCock", 'flags', 'Flags'),
                    new SelectField('FluidType', char, 'tailCumType', 'Cum Type'),
                ]),
                new AccordionGroup("Tailcunt", [
                    new IntegerField(char + ".tailCunt", 'minLooseness', 'Min Looseness', null, 0),
                    new NestedGroup('', [
                        new IntegerField(char + ".tailCunt", 'loosenessRaw', 'Looseness Raw', null, 0),
                        new IntegerField(char + ".tailCunt", 'loosenessMod', 'Looseness Mod', null, 0)
                    ]),
                    new NestedGroup('', [
                        new IntegerField(char + ".tailCunt", 'wetnessRaw', 'Wetness Raw', null, 0),
                        new IntegerField(char + ".tailCunt", 'wetnessMod', 'Wetness Mod', null, 0)
                    ]),
                    new IntegerField(char + ".tailCunt", 'bonusCapacity', 'Bonus Capacity', null, 0),
                    new SelectField('ValidTypes.TailGenital', char + ".tailCunt", 'type', 'Type'),
                    new TextField(char + ".tailCunt", 'vaginaColor', 'Color'),
                    new IntegerField(char + ".tailCunt", 'clits', 'Clits', null, 1),
                    new FloatField(char + ".tailCunt", 'fullness', 'Fullness', null, 0),
                    new IntegerField(char + ".tailCunt", 'shrinkCounter', 'Shrink Counter', null, 0),
                    new SwitchField(char + ".tailCunt", 'hymen', 'Hymen'),
                    new FlagField('ValidFlags.Tailcunt', char + ".tailCunt", 'flags', 'Flags'),
                    new ReadOnlyTextField("Tailcunt flag must be turned on, even if tail has the flag","col-12"),
                    new SelectField('FluidType', char, 'tailGirlCumType', 'Cum Type'),
                ])
            ])
        ]),
        new Row([
            new Group('Milk', [
                new SelectField('FluidType', char, 'milkType', 'Milk Type'),
                new FloatField(char, 'milkFullness', 'Milk Fullness', null, 0),
                new IntegerField(char, 'milkRate', 'Milk Rate', null, 0),
                new IntegerField(char, 'milkMultiplier', 'Milk Multiplier', null, 0),
                new IntegerField(char, 'milkStorageMultiplier', 'Milk Storage Multiplier', null, 0)
            ]),
            new Group('Nipples', [
                new TextField(char, 'nippleColor', 'Nipple Color'),
                new IntegerField(char, 'nipplesPerBreast', 'Nipples Per Breast', null, 0),
                new FloatField(char, 'nippleLengthRatio', 'Nipple Length Ratio', null, 0),
                new FloatField(char, 'nippleWidthRatio', 'Nipple Width Ratio', null, 0),
                new SelectField('ValidTypes.Dicknipple', char, 'dickNippleType', 'Dicknipple type'),
                new IntegerField(char, 'dickNippleMultiplier', 'Dick Nipple Multiplier', null, 0)
            ]),
            new ArrayGroup('Breasts', 'addBreastRow', [
                new ArrayField(char, 'breastRows()', 'getBreastName', 'removeBreastRow', [
                    new IntegerField('', 'breasts', 'Count', null, 0),
                    new IntegerField('', 'breastRatingRaw', 'Rating Raw', null, 0),
                    new IntegerField('', 'breastRatingMod', 'Rating Mod', null, 0),
                    new IntegerField('', 'breastRatingLactationMod', 'Lactation Mod', null, 0),
                    new IntegerField('', 'breastRatingHoneypotMod', 'Honeypot Mod', null, 0),
                    new SelectField('NippleType', '', 'nippleType', 'Nipple Type'),
                    new FloatField('', 'fullness', 'Fullness', null, 0),
                    new FlagField('ValidFlags.Areola', '', 'areolaFlags', 'Areola Flags')
                ])
            ])
        ])
    ]);
}

function displayCrotch() {
    return new Tab([
        new Row([
            new Group('Male Organs', [
                new IntegerField(char, 'balls', 'Balls', null, 0),
                new NestedGroup('', [
                    new FloatField(char, 'ballSizeRaw', 'Ball Size Raw', null, 0),
                    new IntegerField(char, 'ballSizeMod', 'Ball Size Mod', null, 0)
                ]),
                new FloatField(char, 'Internal_ballFullness', 'Ball Fullness', null, 0, 100),
                new FloatField(char, 'Internal_ballEfficiency', 'Ball Efficiency', null, 0),
                new FloatField(char, 'refractoryRate', 'Refractory Rate', null, 0),
                new SelectField('FluidType', char, 'cumType', 'Cum Type'),
                new NestedGroup('', [
                    new FloatField(char, 'cumMultiplierRaw', 'Cum Multiplier Raw', null, 0),
                    new IntegerField(char, 'cumMultiplierMod', 'Cum Multiplier Raw', null, 0)
                ]),
                new NestedGroup('', [
                    new FloatField(char, 'cumQualityRaw', 'Cum Quality Raw', null, 0),
                    new IntegerField(char, 'cumQualityMod', 'Cum Quality Mod', null, 0)
                ]),
                new SwitchField(char, 'cockVirgin', 'Cock Virgin')
            ]),
            new ArrayGroup('Penises', 'addPenis', [
                new ArrayField(char, 'cocks()', 'getPenisName', 'removePenis', [
                    new NestedGroup('', [
                        new FloatField('', 'cLengthRaw', 'Length Raw', null, 0),
                        new FloatField('', 'cLengthMod', 'Length Mod', null, 0),
                    ]),
                    new NestedGroup('', [
                        new FloatField('', 'cThicknessRatioRaw', 'Thickness Ratio Raw', null, 0),
                        new FloatField('', 'cThicknessRatioMod', 'Thickness Ratio Mod', null, 0),
                    ]),
                    new SelectField('ValidTypes.Cock', '', 'cType', 'Type'),
                    new TextField('', 'cockColor', 'Color'),
                    new FloatField('', 'knotMultiplier', 'Knot Multiplier', null, 0),
                    new FloatField('', 'flaccidMultiplier', 'Flaccid Multiplier', null, 0),
                    new SwitchField('', 'virgin', 'Virgin'),
                    new FlagField('ValidFlags.Cock', '', 'flags', 'Flags')
                    //todo piercing - From old creator, i might do this
                ])
            ])
        ]),
        new Row([
            new Group('Female Organs', [
                new NestedGroup('', [
                    new FloatField(char, 'fertilityRaw', 'Fertility Raw', null, 0),
                    new IntegerField(char, 'fertilityMod', 'Fertility Mod', null, 0)
                ]),
                new SelectField('FluidType', char, 'girlCumType', 'Cum Type'),
                new NestedGroup('', [
                    new FloatField(char, 'girlCumMultiplierRaw', 'Cum Multiplier Raw', null, 0),
                    new IntegerField(char, 'girlCumMultiplierMod', 'Cum Multiplier Mod', null, 0)
                ]),
                new FloatField(char, 'clitLength', 'Clit Length', null, 0),
                new SwitchField(char, 'vaginalVirgin', 'Vaginal Virgin')
            ]),
            new ArrayGroup('Vaginas', 'addVagina', [
                new ArrayField(char, 'vaginas()', 'getVaginaName', 'removeVagina', [
                    new IntegerField('', 'minLooseness', 'Min Looseness', null, 0),
                    new NestedGroup('', [
                        new IntegerField('', 'loosenessRaw', 'Looseness Raw', null, 0),
                        new IntegerField('', 'loosenessMod', 'Looseness Mod', null, 0)
                    ]),
                    new NestedGroup('', [
                        new IntegerField('', 'wetnessRaw', 'Wetness Raw', null, 0),
                        new IntegerField('', 'wetnessMod', 'Wetness Mod', null, 0)
                    ]),
                    new IntegerField('', 'bonusCapacity', 'Bonus Capacity', null, 0),
                    new SelectField('ValidTypes.Vagina', '', 'type', 'Type'),
                    new TextField('', 'vaginaColor', 'Color'),
                    new IntegerField('', 'clits', 'Clits', null, 1),
                    new FloatField('', 'fullness', 'Fullness', null, 0),
                    new IntegerField('', 'shrinkCounter', 'Shrink Counter', null, 0),
                    new SwitchField('', 'hymen', 'Hymen'),
                    new FlagField('ValidFlags.Vagina', '', 'flags', 'Flags')
                    //todo piercing - From old creator, i might do this
                ])
            ]),
        ])
    ]);
}

function displayPerks() {
    return new PerkContainer(char, 'perks');
}

function displayStatusEffects() {
    return new StatusEffectContainer(char, 'statusEffects');
}

// Flags comes from the current saved flags & the flags.js file
function displayFlags() {
    return new FlagContainer();
}

function displayKeyitems() {
    return new KeyitemContainer(char, 'keyItems');
}