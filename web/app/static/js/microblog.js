function populate_table(blog_entries) {
    var blog = document.getElementById("blog1");

    Object.keys(blog_entries).reverse().forEach(function (i) {
        var element  = blog_entries[i];
        var entry = document.createElement("div");
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const date1 = new Date(element.date_created + " UTC");
        const date2 = new Date(element.date_updated + " UTC");
        entry.innerHTML = `
            <div class="tweet" id="blog1">
                <div class="row">
                    <div class="col-md-2 text-center">
                        <div class="col-md-2 text-center">
                            <img class="tw-user-medium rounded-circle" src="static/img/Profile2.png">
                        </div>  
                    </div>
                    <div class="col-md-10" id="datainfo">
                        <div class="row tweet-info" id="id">
                            <div class="col-md-auto">
                                <span class="tweet-username" id="name">${element.name}</span>
                                <span class="tweet-usertag text-muted" id="email">${element.email}</span>
                            </div>
                            <div class="col-md-auto">
                                ${element.date_created === element.date_updated ?`<span class="tweet-date-created" id="date_created">${date1.toLocaleDateString("en-US", options)}</span>`:`<span class="tweet-date-updated" id="date_updated">${date2toLocaleDateString("en-US", options)}</span>`}
                            </div>
                            <div class="col tweet-arrow text-muted">
                                <span class="oi oi-arrow-thick-bottom float-right"></span>
                            </div>
                        </div>
                    <div class="tweet-text" id="message"> 
                        ${element.message}
                    </div>
                    <div class="tweet-media">
                        
                    </div>
                    <div class="row text-muted">
                        
                        <div class="col-md-2"><span class="oi oi-bullhorn"></span></div>
                        <div class="col-md-2"><span class="oi oi-loop-circular"></span></div>
                        <div class="col-md-2"><span class="oi oi-heart"></span></div>
                        <div class="col-md-2"><span class="oi oi-envelope-open"></span></div>
                        <div class="col-md-2"><span onclick="removeItem(${element.id})" class="oi oi-trash" id="trash"></span></div>
                        <div class="col-md-2"><span onclick="prePopulateForm(${element.id})" class="oi oi-list" id="edit"></span></div>

                    </div>
                </div>
            </div>
        
        `;
        blog.appendChild(entry);
    });

    // console.log("error404");
}
$(document).ready(function () {
    (function () {
        $.getJSON("lab11/BlogEntry", populate_table);
    })();
});

    // refresh the table after a read update
function refresh_table(blog_entries) {
    document.getElementById("blog1").innerHTML = "";
    document.getElementById("blog1").addEventListener("load", populate_table(blog_entries));
}

$("#blog-table").submit(function (event) {
    // prevent default html form submission action
    event.preventDefault();
    // pack the inputs into a dictionary
    var formData = {};
    $(":input").each(function () {
        var key = $(this).attr('name');
        var val = $(this).val();


        if (key != 'submit') {
            formData[key] = val;
        }
    });

    var $form = $(this);
    var url = $form.attr("action");

    $.post(url, formData, function (blog_entries) {
        refresh_table(blog_entries);
        $('#message').val('');
        $('#entryid').val('');
    });
    toggleView();
});

function prePopulateForm(id) {
    if (!confirm("Are you sure you wanna edit this post?")){
        return false;
    }
    // document.getElementById("name").style.display = "none";
    // document.getElementById("email").style.display = "none";
    $.getJSON('lab11/BlogEntry', function (data) {
        data.forEach(function (i) {
            if (i.id == id){
            $('#blog-table')[0].reset();
            $('#name').val(i.name);
            $('#email').val(i.email);
            $('#message').val(i.message);
            $('#date_updated').val(i.date_updated);
            $('#entryid').val(id);
            }
        });
    });
    toggleView();
}

function removeItem(id) {
    if (!confirm("Think again before delete the blog!")){
        return false;
    }
    var url = "lab11/remove_contact"
    var formData = {'id':id};
    $.post(url, formData, function (blog_entries){
        refresh_table(blog_entries);
    });
}

function clearForm() {
    $('#blog-table')[0].reset();
    $('#entryid').val('');
}

function toggleView() {
    if ($('#add-edit').attr('hidden')) {
    $('#add-edit').removeAttr('hidden');
    } else {
    $('add-edit').attr('hidden', 'hidden');
    }
}

$("#nav-tweet-btn").click(function () {
    clearForm();
    toggleView();
});

$("#clear_form").click(function () {
    clearForm();
});


$("#cancel_form").click(function () {
    clearForm();
    toggleView();
});

$("#delete").click(function () {
    
});