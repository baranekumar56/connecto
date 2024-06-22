const fetchh = async () => {
    while (true){
        const data = await fetch("https://firstwebapp-427117.ue.r.appspot.com/");
        if (data.ok){
            console.log(data.json.toString());
        }
    }
}

fetchh();