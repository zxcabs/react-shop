var file = document.querySelector('.EditProductForm__image-input__hidden-input');
    file.addEventListener('change', function(event) {
        var files = event.target.files;

        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            reader.onload = (function(theFile) {
                return function(event) {

                    var span = document.createElement('span');
                    span.innerHTML = ['<img width="194" class="thumb" src="', event.target.result,
                    '" title="', escape(theFile.name), '"/>'].join('');
                    document.getElementById('list').insertBefore(span, null);
                };
            })(f);

            reader.readAsDataURL(f);
        }
    }, false);