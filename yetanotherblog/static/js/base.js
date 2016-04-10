function createBlogsView(blogs){
    ent = blogs['blogs']
    $(".blogs").html("")
    for(i=0;i<ent.length;i++){
        entry_div = document.createElement("DIV")
        entry_div.setAttribute("class", "blog-div")
        title = document.createElement("H3");
        title.innerHTML = ent[i]["title"];
        
        dateTopic = document.createElement("H4");
        dateTopic.innerHTML = ent[i]["date"] +" | " +ent[i]["topic"];

        link = document.createElement("A");
        link.setAttribute("href", "/blogpost/"+ent[i]["id"]);
        entry_div.appendChild(title);
        entry_div.appendChild(dateTopic);
        link.appendChild(entry_div)

        $(".blogs").append(link)
    }
}
function filter(t){
	 $.ajax({
            url : "filter/",
            type : "GET",
            data : {topic : t},
            success : function(blogs) {
         	    createBlogsView(blogs)
            }
        });
}

function sort(sortBy){
    $.ajax({
        url : "sort/",
        type: "GET",
        data : {type : sortBy},
        success : function(blogs){
            createBlogsView(blogs)
        }

    });
}

$(document).ready(function(){
	//filter("all");
});