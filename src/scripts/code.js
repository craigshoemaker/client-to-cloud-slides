let localDB;
let remoteDB;

const pouchScript = document.createElement('script');
pouchScript.src = '/src/scripts/pouchdb/pouchdb.min.js';
document.getElementsByTagName("head")[0].appendChild(pouchScript);

const hlScript = document.createElement('script');
hlScript.src = '/src/scripts/highlightjs/highlight.pack.js';
document.getElementsByTagName("head")[0].appendChild(hlScript);


setTimeout(() => {
    if (hljs && hljs.initHighlightingOnLoad) {
        hljs.initHighlightingOnLoad();
    }
}, 800);

var api = {

    init: async (databaseName, remoteURL) => {
// ---
localDB = new PouchDB(databaseName);

remoteDB = new PouchDB(remoteURL, {
    skipSetup: true,
    auth: {
        username: 'smoothwookie',
        password: 'ThisIsMyPassword!',
    },
});
// ---
        console.log(localDB);
        console.log(remoteDB);
    },

    get: async () => {
// ---        
const craig = await localDB.get('craig');
// ---
        console.log(craig);
    },

    add: async () => {
// ---
const event = {
    _id: 'craig',
    twitter: 'craigshoemaker'
};

const response = await localDB.put(event);
// ---
        console.log(response);
    },

    update: async() => {
// ---
const craig = await localDB.get('craig');
console.log(craig);

craig.github = 'craigshoemaker';

const response = await localDB.put(craig);
// ---
        console.log(response);
    },

    delete: async () => {
// ---
const craig = await localDB.get('craig');
const response = await localDB.remove(craig);
// ---
        console.log(response);
    },

    sync: () => {
// ---
const syncer = localDB.sync(remoteDB, { live: true, retry: true });

syncer.on('change', (e) => { console.log('change', e); });
syncer.on('paused', (e) => { console.log('paused', e); });
syncer.on('active', (e) => { console.log('active', e); });
syncer.on('denied', (e) => { console.log('denied', e); });
syncer.on('complete', (e) => { console.log('complete', e); });
syncer.on('error', (e) => { console.log('error', e); });

// syncer.cancel();
// ---
    }

};
