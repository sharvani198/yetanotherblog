function filter(t){
	 $.ajax({
            url : "filter/",
            type : "GET",
            data : {topic : t},
            success : function(blogs) {
         	    ent = blogs['blogs']
                $(".blogs").html("")
            	for(i=0;i<ent.length;i++){
                    entry_div = document.createElement("DIV")
                    entry_div.setAttribute("class", "blog-div well well-sm")
                    title = document.createElement("H3");
                    title.innerHTML = ent[i]["title"];
                    
                    dateTopic = document.createElement("H5");
                    dateTopic.innerHTML = ent[i]["date"] +" | " +ent[i]["topic"];

                    link = document.createElement("A");
                    link.setAttribute("href", "/blogpost/"+ent[i]["id"]);
                    entry_div.appendChild(title);
                    entry_div.appendChild(dateTopic);
                    link.appendChild(entry_div)

                    $(".blogs").append(link)
                }
            }
        });
}
function filterAll(){
	 $.ajax({
            url : "filterall",
            type : "GET",
            data : {topic : "tech"},
            success : function(blogs) {
            	alert(blogs);
            	$(".blogs").html(blogs)

            }
        });
}

$(document).ready(function(){
	filter("all");
});