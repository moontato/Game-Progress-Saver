document.addEventListener('DOMContentLoaded',()=>{

    var firebaseRef = firebase.database().ref()
    let chatElem = document.getElementById('titles')

    firebaseRef.on("value", function (snapshot) {

        // Setting firebase data to a variable called "data"
        let data = snapshot.val()

        let dataArray = []

        let dataArrayKeys = Object.keys(data)

        chatElem.innerHTML = "<div>Available Games</div>"

        for (let i = 0; i < dataArrayKeys.length; i++) {
            let tagId = i
            chatElem.appendChild(document.createElement('TR')).appendChild(document.createElement('TH')).appendChild(document.createTextNode(dataArrayKeys[i]))
        }

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });




    fileButton.addEventListener('change', async function (e) {
        document.getElementById("status").innerHTML = "";
        //Get files
        for (let i = 0; i < e.target.files.length; i++) {
            let file = e.target.files[i];
            await uploadFile(file).then((res) => {
                console.log(res);
            });
        }
        document.getElementById("status").innerHTML = "complete!";
        firebaseRef.child(document.getElementById("gameTitle").value).set(0)
    });


    //Handle waiting to upload each file using promise
    async function uploadFile(file) {
        return new Promise(function (resolve, reject) {
            let storageRef = firebase.storage().ref(document.getElementById("gameTitle").value + "/" + file.name);
            let task = storageRef.put(file);

            //Update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                    let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    uploader.value = percentage;
                },
                function error(err) {
                    console.log(err);
                    reject(err);
                    document.getElementById("status").innerHTML = "error"
                    document.getElementById("status").style.color = "red";
                },
                function complete() {
                    let downloadURL = task.snapshot.downloadURL;
                    resolve(downloadURL);
                }
            );
        });
    }
})