$(document).ready(function(){
    var pageNum = 1;
    $('#previous').hide();
    $(function() {
        $("body").tooltip({ selector: '[data-tooltip=tooltip]' });
    });


    //Create function to call AJAX
    var callAjax = function(pageNum){
        $.ajax({
            type:'GET',
            url: 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=81cf3141b420511b67afed331d831773&page='+pageNum,
            dataType: 'json',
            success: function(data){                 
                var template = $('#template').html();
                var html = Mustache.to_html(template,data);
                $('#result').append(html);
                
                //Set modal title & content
                $('.title').on('click',function(){
                    var movieId = $(this).data('value');
                    data.results.forEach(function(value){
                        if(value.id == movieId){
                            $('#exampleModalLongTitle').text(value.title);
                            console.log(value.release_date);
                            $('.modal-body p').text('Release on '+value.release_date);
                            $('.modal-body img').attr('src','https://image.tmdb.org/t/p/w500'+value.poster_path);
                        }
                         
                    });
                })
            }
        });
    }

    //Load first page
    callAjax(pageNum);

    //Load next page 
    $('#next').on('click',function(e){
        e.preventDefault();
        $('#result').html('');
        $('#previous').show();
        pageNum += 1;
        callAjax(pageNum);
    });

    //Load previous page 
    $('#previous').on('click',function(e){
        e.preventDefault();
        $('#result').html('');
        pageNum -= 1;
        if(pageNum == 1 ) $('#previous').hide();
        callAjax(pageNum);
        // console.log(pageNum);
    });  
});