document.addEventListener('DOMContentLoaded',()=>{

    fileButton.addEventListener('change', async function (e) {
        document.getElementById("status").innerHTML = "";
        //Get files
        for (var i = 0; i < e.target.files.length; i++) {
            var file = e.target.files[i];
            await uploadFile(file).then((res) => {
                console.log(res);
            });
        }
        document.getElementById("status").innerHTML = "complete!";
    });


    //Handle waiting to upload each file using promise
    async function uploadFile(file) {
        return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref(document.getElementById("gameTitle").value + "/" + file.name);
            var task = storageRef.put(file);

            //Update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                    var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    uploader.value = percentage;
                },
                function error(err) {
                    console.log(err);
                    reject(err);
                    document.getElementById("status").innerHTML = "error"
                    document.getElementById("status").style.color = "red";
                },
                function complete() {
                    var downloadURL = task.snapshot.downloadURL;
                    resolve(downloadURL);
                }
            );
        });
    }
})