const admin = require('firebase-admin');
const fs = require('fs');
const promptly = require('promptly');

function log(msg, newline = true) {
  process.stdout.write(msg);
  if (newline) {
    process.stdout.write("\n");
  }
}

var serviceAccount = require('../secrets/libry-dev-firebase-adminsdk-yuh17-ad9f241fa5.json');
//var serviceAccount = require('../secrets/libry-configuration-firebase-adminsdk-hjshc-e70decf45e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


(async function() {

  const chooses = ['languages', 'products', 'schemas', 'translations', 'groups'];
  const type = await promptly.choose('What to upload (' + chooses.join(', ') + ')? ', chooses);

  const schemaPath = './' + type;

  const items = fs.readdirSync(schemaPath);
  for (var i = 0; i < items.length; i++) {
    const file = items[i];
    if (file.substr(-5) === '.json') {
      const schema = file.substr(0, file.length - 5).trim();
      if (schema.length > 0) {
        const schemaRef = db.collection(type).doc(schema);
        const doc = await schemaRef.get()
        if (!doc.exists) {
          const data = fs.readFileSync(schemaPath + '/' + file, 'utf-8');
          if (data) {
            const json = JSON.parse(data);
            log(`Missing '${schema}', Uploading ... `, false);
            await schemaRef.set(json)
              .then(() => {
                log("Done");
              })
              .catch((__err) => {
                log("Error uploading: " + __err);
              });
          }
        }
      }
    }
  };
})();