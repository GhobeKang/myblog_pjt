/**
 * Created by Ghobe on 2017-11-28.
 */
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['code-block'],

    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//        [{ 'direction': 'rtl' }],                         // text direction

    //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'size': ['small', false, 'large', 'huge'] },{ 'font': [] }],  // custom dropdown
    [{ 'align': [] }],

    ['link', 'image'],

//        ['clean']                                         // remove formatting button
];

var quill = new Quill('#texteditor', {
    modules: {
        toolbar: toolbarOptions
    },
    theme: 'snow'
});
