let localDB;
let remoteDB;

const pouchScript = document.createElement('script');
pouchScript.src = '/src/scripts/pouchdb/pouchdb.min.js';
document.getElementsByTagName("head")[0].appendChild(pouchScript);

const hlScript = document.createElement('script');
hlScript.src = '/src/scripts/highlightjs/highlight.pack.js';
hlScript.onload = () => {
    hljs.initHighlightingOnLoad();
};
document.getElementsByTagName("head")[0].appendChild(hlScript);

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
const user = {
    _id: 'craig',
    twitter: 'craigshoemaker'
};

const response = await localDB.put(user);
// ---
        console.log(response);
    },

    update: async() => {
// ---
const user = await localDB.get('craig');

console.log(user);

user.github = 'craigshoemaker';

const response = await localDB.put(user);
// ---
        console.log(response);
    },

    delete: async () => {
// ---
const user = await localDB.get('craig');
const response = await localDB.remove(user);
// ---
        console.log(response);
    },

    sync: () => {
// ---
const options = {
    live: true,
    retry: true
};

const syncer = localDB.sync(remoteDB, options);

syncer.on('change', (e) => { console.log('change', e); });
syncer.on('paused', (e) => { console.log('paused', e); });
syncer.on('active', (e) => { console.log('active', e); });
syncer.on('denied', (e) => { console.log('denied', e); });
syncer.on('complete', (e) => { console.log('complete', e); });
syncer.on('error', (e) => { console.log('error', e); });

// syncer.cancel();
// ---
    },

    getAll: async () => {
// ---
const options = {
    include_docs: true,
    conflicts: true
};

const response = await localDB.allDocs(options);
// response.rows;
// ---
        console.log(response);

        return response.rows;
    },

    resolveImmediateConflict: async (selectedSource) => {
// ---
let title;
let id;

if (/database/i.test(selectedSource)) {
    title = databaseRecord.title;
    id = databaseRecord._id;
} else {
    title = incomingRecord.title;
    id = incomingRecord._id;
}

const todo = await this.data.get(this.source, id);
todo.title = title;

const response = await this.data.saveTodo(this.source, todo);
// ---
    },

    resolveEventualConflict: async (id, winningRevId) => {
// ---
const options = {
    conflicts: true
};

const todo = await localDB.get(id, options);

let revIds = todo._conflicts;
revIds.push(todo._rev);
revIds = revIds.filter(conflictId => conflictId !== winningRevId);

const conflicts = revIds.map(rev => {
    return {
        _id: todo._id,
        _rev: rev,
        _deleted: true
    };
});

const response = await localDB.bulkDocs(conflicts);
// ---
    },

    initializeDemo: async () => {
        let counter = 0;

        localDB = new PouchDB('api-demos');

        await localDB.destroy();

        localDB = new PouchDB('api-demos');

        await localDB.bulkDocs([
            {
                _id: (new Date()).toISOString() + (counter++).toString(),
                title: 'Don\'t trust atoms, they make up everything.'
            },
            {
                _id: (new Date()).toISOString() + (counter++).toString(),
                title: 'I used to be addicted to soap, but I\'m clean now.'
            },
            {
                _id: (new Date()).toISOString() + (counter++).toString(),
                title: 'R.I.P boiled water. You will be mist!'
            }
        ]);

        console.log('The local database is seeded');
    }
};
