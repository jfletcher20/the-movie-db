# the-movie-db
App made as part of the "Development of web applications" course. Uses NodeJS, Angular, SQLite.

# User manual

If running <code>npm install</code> works fine for you, then you should delete the node_modules folders first. Since I had major issues with installation of modules after migrating from Linux to Windows, I have decided to leave the node_modules folder in to try and help anybody trying to run the app. 

After running <code>npm install</code>:

<ol>
  <li>Open the base folder in VS Code and search all files and replace every instance of <code>INSERT_NODE_MODULES_PATH_HERE</code> with your own path to the node_modules folder. Make sure you include the <code>/</code> at the end. Since the "tsc &&" prefix to the start scripts has been removed, the typescript files are not compiled before running anymore so it is important to replace <i>all</i> instances, located in:
  <ul>
    <li><code>dirModula</code> in <code>server/konstante.js</code></li>
    <li><code>dirModula</code> in <code>server/build/konstante.js</code></li>
    <li><code>typeRoots</code>, <code>paths</code> in <code>server/tsconfig.json</code></li>
  </ul>
  </li>
  <li>Add the API key for the v3 API in the "konfiguracija.csv" file if you want external TMDB services to work. The website works without this, but if you want to retrieve new movies or genres from https://www.themoviedb.org/ then you have to include an API key.
  (I know this is normally not supposed to be done, but to make it easier on you, here is my API key: <code>99d77adf9c02e0a70d13e4fc87fac134</code>)</li>
  <li>Enter directory <code>/server/servis</code> via command prompt and execut "npm start"</li>
  <li>Enter directory <code>/server/aplikacija</code> via command prompt and execute "npm start"</li>
</ol>

### Potential difficulties when running
Some errors might appear. It seems to vary from PC to PC. Some of my friends were able to execute the project without any issues whatsoever, others had to troubleshoot errors caused by their computers. Normally the start scripts included a "tsc &&" at the start which builds typescript files into the build folder which is where the files that are executed are located, but when trying to run it on my PC I had to remove it. For others the "tsc &&" didn't cause any problems.

Because of all the difficulties I had running it on Windows after moving it from Linux over to my PC, I decided to leave the node_modules folders and you can update them as necessary. It is still necessary to replace the node_modules paths within the project to your own paths, though.
You can e-mail me and I'll send you screenshots or a video (whichever you request) of the site running.

## Specifications

Check the Documentation page of the website to see which project specifications I was able to implement within the time limit, and which I was not.

I was extremely limited in terms of time because of school-adjacent activities and other university projects at the tiem, but I still managed to earn the maximum amount of points for the second part of the project thanks to cashing in on bonus points from bonus tasks.

I would have liked to have finished it to the end and I may yet come back to it, but for now this is what has been done.

## Personal review

### NodeJS code
There were things I simply did not know at the time pertaining to NodeJS that would have made my life a lot easier had I known (in terms of CORS).

### Typescript code
Definitely cut corners on this. Would have loved to properly make use of all of Typescript's features, as it was by definitely the most enjoyable part of the project since I prefer strong typing in programming, but I just did not have the time to do it properly. However, Typescript knowledge gained on this project has allowed me to earn better grades on subjects in the following semester.

### Angular code
I was almost at the deadline when I started converting the app's HTML-CSS-JS to Angular-SASS-TS and was not able to focus on making proper use of Angular's features like I wanted. Angular was by far the most interesting part of this project for me, so I was sad to have to cut corners but I had already done the design in pure CSS before for the 1st project iteration and merely ended up converting it to SASS and adapting the code for Angular.
I could take a couple days to refactor the code and make it all work properly for Angular, but I have other actual productive volunteer work I am doing at the moment so this will be postponed until further notice.
