document.addEventListener('DOMContentLoaded',()=>{

    let firebaseRef = firebase.database().ref()
    let chatElem = document.getElementById('titles')

    firebaseRef.on("value", function (snapshot) {

        // Setting firebase data to a variable called "data"
        let data = snapshot.val()

        let dataArray = []

        let dataArrayKeys = Object.keys(data)

        chatElem.innerHTML = "<div>Available Games</div>"

        for (i = 0; i < dataArrayKeys.length; i++) {
            let tagId = i
            chatElem.appendChild(document.createElement('TR')).appendChild(document.createElement('TH')).appendChild(document.createTextNode(dataArrayKeys[i]))
        }

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });





    document.getElementById('downloadButton').addEventListener('click', ()=>{
        let title = document.getElementById('gameTitle').value;
        downloadURL(title);
    })

})

async function downloadURL(folderName){

    let storage = firebase.storage();
    let storageRef = storage.ref();

    storageRef.child(folderName).listAll().then(function(result){
        result.items.forEach(async function(saveRef){
            let link = await saveRef.toString()

            let path = splitLink(link).toString().replace(',','/')
            openWindows(path)
        });
    })
}

function splitLink(link) {

    let splitted = link.split('/')
    splitted = splitted.splice(3, splitted.length)

    return Array.from(splitted);
}

async function openWindows(path) {
    let downloadURL = await firebase.storage().ref(path).getDownloadURL()
    window.open(downloadURL)
}

