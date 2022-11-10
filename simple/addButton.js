/* 한국어 위키백과 미디어위키:Gadget-editsummary.js 호출 */

function esEditSummary() {
    if (typeof esEditSummaries === 'undefined') return;
    var wgAction = mw.config.get('wgAction');
    if (wgAction == 'edit' || wgAction == 'submit') {
        var wpSummary = document.getElementById('wpSummary');
        if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return;
        wpSummaryButtons = document.createElement('span');
        wpSummaryButtons.id = 'esSummaryButtons';
        wpSummary.parentNode.insertBefore(wpSummaryButtons, wpSummary.nextSibling);
        for (var i = 0; i < esEditSummaries.length; i++) esAppendButton(i);
    }
}

function esAppendButton(id) { // 버튼 추가하는 함수
    var btn = document.createElement('esSummaryButton');
    btn.appendChild(document.createTextNode(esEditSummaries[id][0]));
    btn.title = esEditSummaries[id][2];
    btn.style.fontSize = "1em" // 스타일 지정
    btn.onclick = function() {esInsertSummary(esEditSummaries[id][1], esEditSummaries[id][3], esEditSummaries[id][4])};
    wpSummaryButtons.appendChild(btn);
}

function esInsertSummary(text, isMinor, clear) {
    var wpSummary = document.getElementById('wpSummary');
    if (isMinor !== undefined) { $('#wpMinoredit').prop('checked', isMinor, clear); }
    if (clear == 1) {
        wpSummary.value = text;
        return;
    }
    if (wpSummary.value.indexOf(text) != -1) return ;
    if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ',';
    if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' ';
    wpSummary.value += text;
}

jQuery( document ).ready(esEditSummary);

// ['버튼 이름', '입력되는 편집 요약', '툴팁으로 뜨는 설명(생략가능)', 사소한 편집 여부, 상용구 넣기 전 요약 지우기]
// 사소한 편집 여부, 요약 지우기는 0/1 혹은 false/true로 표시
esEditSummaries = [
    ['갱신', '문서 정보를 새로 고침', '오래된 문서 정보를 갱신함', 0, 1],
    ['넘겨주기', '넘겨주기 생성', '넘겨주기 생성', 1, 1],
    ['동음', '동음이의어 문서 작성', '동음이의 문서를 작성', 0, 1],
    ['분류추가', '문서에 분류를 추가', '분류를 추가할 때 사용', 0, 1],
    ['분류조정', '문서 분류 재조정', '분류 추가 삭제 및 정리', 1, 1],
    ['삭제신청', '문서 삭제 신청', '삭제 신청 틀을 담', 1, 1],
    ['오타','문서 내의 오타 수정','문서에서 오타를 정정함', 1, 1],
    ['답변', '의견에 답변함', '질문이나 의견에 답변을 함', 1,0],
    ['분할', '문단을 새 문서로 분할 - ', '다른 문서와의 병합을 제안하거나 실행함', 0, 1],
    ['내용추가', '문서의 내용 추가', '다른 문서에서 내용 추가', 0, 1 ]
];
