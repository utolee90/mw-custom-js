// var $need_margin = Math.min(Math.max(0, 1510-parseInt(window.innerWidth)),190) //1510픽셀 이상일 때는 여백 0, 최대 190픽셀만 여백 지정

var mediaViewContent = window.matchMedia('(min-width: 1280px)')

//최근 바뀜 목록 보이기 - 출처 : https://github.com/librewiki/liberty-skin/blob/master/js/live-recent.js
// $('#content').css("margin-right", String($need_margin)+'px'); // 800px 이상일 때만 여백 나타나게 지정

if (mediaViewContent.matches) {
    $( function () {

        $('body').append('<div id="libre-recent-vector"></div>');  // 최근 바뀜 상자
        $('#libre-recent-vector').append('<div id="libre-recent-tabs"></div>'); // 최근 바뀜 상자 탭 버튼
        $('#libre-recent-vector').append('<div id="recent-list-div"></div>'); // 최근 바뀜 상자 내용
        $('#libre-recent-tabs').append('<div id="recent-text" class="selected">최근 문서</div>'); // 최근 문서 버튼
        $('#libre-recent-tabs').append('<div id="recent-talk">최근 토론</div>'); // 최근 토론 버튼
        $('#recent-list-div').append('<div class="live-recent-content"></div>'); // 최근 바뀜 내용
        $('#recent-list-div').append('<div class="recent-more" title="최근 바뀜 문서">최근 바뀜 더 보기</div>'); // 더 알아보기
        $('.live-recent-content').append('<ul id="live-recent-list" class="live-recent-list docupage"></div>'); // 리스트

        var listNum = 10; // 목록 갯수
        // 목록 갯수에 따라 오브젝트 추가
        for (var j = 0; j<listNum; j++) {
            $('#live-recent-list').append('<li class="recent-item-background"><span class="recent-item">'+j.toString()+'</span></li>');
            $('.recent-item-background')[j].style.background= j%2 ==0 ? '#eee' : '#c1d8e1';
        }


//기초 css 지정
        $('#libre-recent-vector').css({"position":"fixed","top":"15%","right":"10px"});
        $('#libre-recent-tabs').css({"display":"flex", "padding":"3px", "border":"1px solid grey", "background":"#ddf"});
        $('#recent-text').css({"padding":"3px", "flex":"1", "background":"#417ff3", "color":"white", "font-weight":"bold", "cursor":"pointer", "textAlign":"center"});
        $('#recent-talk').css({"padding":"3px", "flex":"1", "background":"white", "font-weight":"bold", "cursor":"pointer", "textAlign":"center"});
        $('#recent-list-div').css({"width":"180px", "top":"auto", "right":"10px"});
        $('.live-recent-list.docupage').css({"display":"block", "list-style-type": "none", "padding": "0", "margin": "0"});
        $('.live-recent-content').css({"border":"1px solid grey", 'background':'#eee', 'fontSize':'0.8em'});
        $('.live-recent-list.docupage>li').css({"border-collapse":"collapse"});
        $('.recent-more').css({"border":"1px solid grey", "background":"#c1d8e1", "color":"#417ff3", "textAlign":"center", "cursor":"pointer", "fontWeight":"bold"}); // 더 보기 버튼
        $('.recent-more').click(function(){window.location.href='//librewiki.net/wiki/특수:최근바뀜';});


//가로폭이 좁으면 content 내용 좁히기.
        'use strict';
        var articleNamespaces, talkNamespaces, isArticleTab, limit; //변수 지정
        articleNamespaces = '0|4|10|12|14|1600|1602'; // 문서 페이지 네임스페이스 번호 지정 가능
        talkNamespaces = '1|5|7|9|11|13|15|829|1601|1603|2600'; //토론 페이지 네임스페이스 번호 지정가능
        isArticleTab = true;  //문서 탭이 초기일 때
        limit = $( '#live-recent-list' )[ 0 ].childElementCount; // id가 live-recent-list인 ul의 자식 원소인 li 갯수만큼 추출

        function timeFormat( time ) { //시간 출력형태 결정
            var aDayAgo, hour, minute, second;
            aDayAgo = new Date();
            aDayAgo.setDate( aDayAgo.getDate() - 1 ); //하루 전의 같은 시간 표시
            if ( time < aDayAgo ) { //만일 하루전보다 시간이 지날 경우
                return ( time.getFullYear() ) + '/' + ( time.getMonth() + 1 ) + '/' + time.getDate();
            } //시간 대신 날짜로 표시
            hour = time.getHours();
            minute = time.getMinutes();
            second = time.getSeconds();
            if ( hour < 10 ) { //10보다 작으면 강제로 십의 자리에 0을 끼운다.
                hour = '0' + hour;
            }
            if ( minute < 10 ) {
                minute = '0' + minute;
            }
            if ( second < 10 ) {
                second = '0' + second;
            }
            return hour + ':' + minute + ':' + second;
        }

        function refreshLiveRecent() {
            var getParameter;
            if ( !$( '#live-recent-list' ).length || $( '#live-recent-list' ).is( ':hidden' ) ) {
                return; //길이가 정의 불가능이거나 내용이 숨겨져 있을 경우 내용을 출력 안 함.
            }
            getParameter = { //쿼리 지정할 수 있습니다.
                action: 'query',
                list: 'recentchanges',
                rcprop: 'title|timestamp', //긁어오는 정보 - 제목, 편집시간
                rcshow: '!bot|!redirect', //봇 편집, 넘겨주기는 제외
                rctype: 'edit|new', //편집, 새문서
                rclimit: limit, //긁어오는 문서 숫자 - limit으로 지정
                format: 'json', //json으로 api 긁어오기
                rcnamespace: isArticleTab ? articleNamespaces : talkNamespaces, //보여줄 이름공간 지정
                rctoponly: true
            };
            var api = new mw.Api();
            api.get( getParameter )
                .then( function ( data ) {
                    var recentChanges, html, time, line, text;
                    recentChanges = data.query.recentchanges;
                    for (var j= 0; j<limit; j++) {
                        $('.recent-item-background')[j].innerHTML = '';
                        if (j < recentChanges.length) {
                            var item = recentChanges[j];
                            var time = new Date( item.timestamp );

                            var newA = document.createElement('a'); // 하이퍼링크 텍스트
                            newA.setAttribute('href', mw.util.getUrl(item.title));
                            newA.setAttribute('title', item.title);
                            newA.classList.add('recent-item');
                            var titletext = item.title.length > 13 ? item.title.slice(0,13)+'..' : item.title;
                            newA.innerText = '[' + timeFormat( time ) + '] ' + titletext;
                            // 새문서일 때
                            if (item.type == 'new') {
                                newA.style.color = '#d45';
                                newA.setAttribute('title', item.title+ " (NEW)");
                                // newA.innerHTML += ' <span class="new">' + mw.msg( 'liberty-feed-new' ) + ' </span>'; 미작동되기에 일단 지우기
                            }
                            $('.recent-item-background')[j].appendChild(newA);
                        }
                    }
                })
                .catch( function () {} );
        }
//isArticleTab 바꿔주기

//클릭 시 표시되는 내용 지정
        var rtext=$('#recent-text');
        var rtalk=$('#recent-talk');
        rtext.click(function(){rtext.css({"background":"#417ff3", "color":"white"});
            rtalk.css({"background":"white", "color":"black"});
            isArticleTab = true;
            refreshLiveRecent();
        }); //최근문서 배경색 파랗게, 최근문서  내용 보이고 최근토론 내용 숨김
        rtalk.click(function(){rtext.css({"background":"white", "color":"black"});
            rtalk.css({"background":"#417ff3", "color":"white"});
            isArticleTab = false;
            refreshLiveRecent(); } ); //최근토론 배경색 파랗게, 최근문서  내용 숨기고 최근토론 내용 보임

        setInterval( refreshLiveRecent, 5 * 60 * 1000 );
        refreshLiveRecent();
    } );

}
else {
    document.querySelector('#libre-recent-vector').style.display = none;
}
