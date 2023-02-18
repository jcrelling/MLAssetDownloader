function downloadAssets() {
    const listDownload = [];
    // Processing Images
    if ($('#images').val()) {
        console.log("imagenes")
        var imagesList = $('#images').val().split('\n');
        //console.log(imagesList); //debug
        $.map( imagesList, function( n ) {
            MLurl = n.split('/').pop();
            url = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'+MLurl+'/2400';
            FileName = MLurl+'.jpg';
            downloadFile(url, FileName);
            //listDownload.push('https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'+MLurl+'/1200');
            //listDownload.push({FileName: MLurl+'.jpg', URL: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'+MLurl+'/1200'});
            //console.log(imageListDownload); //debug
        });
    };

    // Processing Videos
    if ($('#videos').val()) {
        console.log("videos")
        var videoList = $('#videos').val().split('\n');
        //console.log(videoList); //debug
        $.map( videoList, function( n ) {
            MLurl = n.split('/').pop();
            listDownload.push('https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'+MLurl+'/mp4/1280');
            //console.log(videoListDownload); //debug
            });
    };


    // Processing sounds
    if ($('#sounds').val()) {
        console.log("sonidos")
        var soundList = $('#sounds').val().split('\n');
        //console.log(soundList); //debug
        $.map( soundList, function( n ) {
            MLurl = n.split('/').pop();
            listDownload.push('https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'+MLurl+'/audio');
            //console.log(soundListDownload); //debug
            });
    };

    console.log(listDownload);

};



function downloadFile(url, fileName) {
  fetch(url, { method: 'get', referrerPolicy: 'no-referrer' })
    .then(res => {
        console.log(res)
      })
    .then(res => res.blob())
    .then(res => {
      const aElement = document.createElement('a');
      aElement.setAttribute('download', fileName);
      const href = URL.createObjectURL(res);
      console.log(href)
      aElement.href = href;
      aElement.setAttribute('target', '_blank');
      aElement.click();
      URL.revokeObjectURL(href);
    });
};


async function toDataURL(url) {
  const blob = await fetch(url).then(res => res.blob());
  return URL.createObjectURL(blob);
}

async function download(imageURL, filename) {
  const a = document.createElement("a");
  a.href = await toDataURL(imageURL);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}