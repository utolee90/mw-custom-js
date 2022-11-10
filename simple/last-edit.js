// API로 사용자가
// 사용 방법 : 자산의 사용자 자바스크립트 문서에 주석기호 '//'를 빼고 아래 문구를 입력하시면 사용가능합니다.
// mw.loader.load('//librewiki.net/index.php?title=사용자:Utolee90/lastedit.js&action=raw&ctype=text/javascript');
var a_title = mw.config.get('wgPageName');
var params_1 = {
        action: 'query',
        prop: 'revisions',
        utf8 : 1,
        titles : a_title,
        rvlimit : 1,
        format: 'json'
    },
api_1 = new mw.Api(); // api 얻기


api_1.get( params_1 ).done( function ( data ) {
        const addZero = (i) => { // 0함수 추가
            if (parseInt(i) < 10) {
                i = "0" + i;
            }
            return i+"";
        };
        if (mw.config.get('wgAction') === 'view' && mw.config.get('wgNamespaceNumber') > -1 && mw.config.get('wgNamespaceNumber') !=3 && mw.config.get('wgNamespaceNumber')<2000) { //사용자토론 이름공간도 빼기
            const rv_data = data.query.pages; // 리비전 확인
            const page_id = parseInt(Object.keys(rv_data)[0]); // PageID 형식으로 출력.
            let $status_info = $('<div id="document-status-infos"></div>');
            $('#mw-content-text').prepend($status_info);
            const rv_status = rv_data[page_id]['revisions'][0]; // 최근 리비전 상태 출력
            const rv_last_edit = new Date(rv_status.timestamp); // 마지막 변경 시점.
            const day_char_list = ['일','월','화','수','목','금','토'];
            const rv_last_time = (rv_last_edit.getFullYear())+'년 '+(rv_last_edit.getMonth()+1)+'월 '+(rv_last_edit.getDate())+'일 ('+day_char_list[parseInt(rv_last_edit.getDay())]+') '+addZero(rv_last_edit.getHours())+':'+addZero(rv_last_edit.getMinutes()); // 날짜 문자열 표시
            rv_last_link_text = 'https://librewiki.net/index.php?title='+a_title+'&diff=prev&oldid='+rv_status.revid;
            $status_info.html('<small>'+rv_status.user+'에 의해 '+rv_last_time+'에 <a href="'+rv_last_link_text+'"> 마지막으로 편집됨</small>').css({'text-align':'right'});

        }
    }
);
