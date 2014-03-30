App.helper.loadTemplates = function (templates, callback) {
  var loadedTemplates = 0;

  var registerTemplate = function (name, template) {
    var templateElement = '<script type="text/haml-template" id="' + name + '-template">';
    templateElement += template;
    templateElement += '</script>';
    $('body').append(templateElement);
  };

  var isLoadComplete = function () {
    return loadedTemplates === templates.length;
  };

  _(templates).each(function (template) {
    $.get(template.path, function (haml) {
      registerTemplate(template.name, haml);
      loadedTemplates ++;
      if (isLoadComplete()) {
        callback();
      }
    });
  });

};

App.helper.renderTemplate = function (sourceId, model) {
  var fn = haml.compileHaml({sourceId: sourceId + '-template'});
  return fn(model);
};
