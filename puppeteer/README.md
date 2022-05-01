<h1>Web scraper</h1>
<p>This program retrieves the game data used in the save editor.</p>
<p>I initially wanted this to run every time the editor was opened to always get the latest stuff, but:
<ul>
<li>It would need a server or some kind of hosting for Node</li>
<li>It would take ages (relatively) to load everything in, and that's every time the page is loaded (again, no server to work with)</li>
<li>It would still mean "hardcoded" values need to be used if and when an offline version is released</li>
<li>I had no experience with Node (and very little with JS) up until this point so the end result would probably slow things down even more</li>
</ul>

<!--<h1>How to use</h1>
<p><b>I run this on Windows. I don't know how this works, if at all, on other platforms.</b></p>
<h3>Requirements</h3>
<ul>
	<li>At least 500mb of space</li>
	<li>A stable internet connection</li>
</ul>
<hr/>
<ol>
	<li>Download and install <a href="https://nodejs.org/">Node.js</a></li>
	<li>Create a folder, which will be the root directory</li>
	<li>In the root folder, create another folder named <b>data</b></li>
	<li>Open the command prompt (Press <kbd>Win</kbd> + <kbd>R</kbd>, type <code>cmd</code> and press <kbd>Enter</kbd>)</li>
	<li>Navigate to your root folder's path (type <code>cd {folder-path}</code> and press <kbd>Enter</kbd>)</li>
	<li>Double check the path is correct, type <code>npm install puppeteer</code> and press <kbd>Enter</kbd></li>
	<li>Type <code>npm install prettier</code> and press <kbd>Enter</kbd></li>
	<li>Running these two commands will create additional files and folders, you don't need to worry about those</li>
	<li>Download the <code>index.js</code> file and place it in the root folder</li>
	<li>Return to the command prompt, type <code>node index</code> and press <kbd>Enter</kbd></li>
</ol>
<p>The resulting files will go in the <b>data</b> folder, but can be changed if you edit the <code>index.js</code> file</p>-->