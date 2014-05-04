app.directive('video', function($sce) {
  return {
    restrict: 'EA',
    replace: true,
    template: '<div class="form-group"><label class="col-md-2" for="videoTitle">Video Title</label><div class="col-md-10"><input type="text" required="required" placeholder="Video title" class="form-control videoTitle" /></div></div>' +
        '<div class="form-group"><label class="col-md-2" for="videoUrl">Video Url</label><div class="col-md-10"><input type="url" required="required" placeholder="Video url" class="form-control videoUrl" /></div></div>'
  };
});