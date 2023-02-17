function downloadAssets() {
    const listDownload = [];
    // Processing Images
    if ($('#images').val()) {
        console.log("imagenes")
        var imagesList = $('#images').val().split('\n');
        //console.log(imagesList); //debug
        $.map( imagesList, function( n ) {
            MLurl = n.split('/').pop();
            //listDownload.push('https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'+MLurl+'/1200');
            listDownload.push({FileName: MLurl+'.jpg', URL: 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'+MLurl+'/1200'});
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

    $.map( listDownload, function( asset ) {
      console.log('dentro del map')
      fetch(asset.URL, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
      .then(res => res.blob())
      .then(res => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', asset.FileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
      });
    });
    //download_files(listDownload);
};





  function download_files(files) {
    function download_next(i) {
      if (i >= files.length) {
        return;
      }
      var a = document.createElement('a');
      a.href = files[i];
      a.target = '_blank';
      // Use a.download if available, it prevents plugins from opening.
      if ('download' in a) {
        a.download = files[i].filename;
      }
      // Add a to the doc for click to work.
      (document.body || document.documentElement).appendChild(a);
      if (a.click) {
        a.click(); // The click method is supported by most browsers.
      } else {
        $(a).click(); // Backup using jquery
      }
      // Delete the temporary link.
      a.parentNode.removeChild(a);
      // Download the next file with a small timeout. The timeout is necessary
      // for IE, which will otherwise only download the first file.
      setTimeout(function() {
        download_next(i + 1);
      }, 500);
    }
    // Initiate the first download.
    download_next(0);
  }