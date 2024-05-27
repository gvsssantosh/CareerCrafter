exports.getCurrentTimestamp = function () {
    let d = new Date();

    

    // Format the time
    // let time =  + ":" +  + ":" + d.getSeconds();
    let strDateStamp = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    return(strDateStamp);

}