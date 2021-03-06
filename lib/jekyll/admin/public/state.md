Redux State
=============

``` javascript

state : {

  configuration: {
    config: "title: Your awesome title\nemail: your-email@domain.com..", // GET /configuration
    isFetching: false, // only render when fetched
    editorChanged: false, // for enabling save button on change,
    error: '', // e.g "Configuration updated.", "Error"
    updated: false // for Save/Saved button
  },

  pages: {
    pages: [ // GET /pages
      { id, body, meta },
      { id, body, meta }
    ],
    currentPage: { id, body, meta }, // GET /pages/:id
    isFetching: false,
    message: null,
  },

  collections: {
    collections: ['posts', 'movies'], // GET /collections
    currentCollection: { // GET /collections/:collection_name
      collection_name: 'posts',
      meta: {
        path: '/posts'
      }
    },
    currentDocuments: [ //GET /collections/:collection_name/documents
      {id, collection_name, meta},
      {id, collection_name, meta}
    ],
    currentDocument: { //GET /collections/:collection_name/documents/:id
      id,
      collection_name,
      body,
      meta
    },
    message: null
  },

  metadata: {
    layout: "post",
    categories: "gsoc",
    students: [
      {
        name: "Mert Kahyaoğlu",
        email: "mertkahyaoglu93@gmail.com",
        username: "mertkahyaoglu"
      },
      {
        name: "Ankur Singh",
        email: "ankur13019@iiitd.ac.in",
        username: "rush-skills"
      }
    ],
    mentors: ["Ben Balter", "Jurgen Leschner", "Parker Moore"]
  },

  search: {
    input: ''
  },

  static_files: {
    files: [{path}, {path2}], // GET /static_files
    message: null
  },

  data: {
    files: [{path}, {path2}], // GET /data
    message: null
  },

  git: {
    status, // GET /git/status
    remote,
    branch,
    message: null
  }

}

```
