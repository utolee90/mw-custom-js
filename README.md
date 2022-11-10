## Custom JS for Mediawiki
### 개요
이 소스는 [리브레 위키](https://librewiki.net/) 에서 사용할 수 있는 사용자 자바스크립트를 모은 문서입니다. 

### 사용 방법
소스를 사용할 때에는 우선 리브레 위키에 로그인한 후 [내 사용자 문서](https://librewiki.net/wiki/Special:MyPage/) 의 하위 페이지에 주어잔 자바스크립트 소스의 파일명을 적은 뒤(예시: 사용자:Utolee90/addButton.js)에 
[내 사용자 자바스크립트 문서](https://librewiki.net/wiki/Special:MyPage/common.js) 에 다음과 같은 코드를 사용하시면 됩니다.
```
// 예시 : addButton.js를 사용할 때는 다음과 같은 코드를 사용합니다.
var username = (사용자명); // (사용자명) 변수를 입력해주세요.
mw.loader.load('/index.php?title=User:' + username + '/addButton.js&action=raw&ctype=text/javascript');

```
### 목록
* `/simple` - 파생 파일 없이 하나의 자바스크립트 파일로 구동되는 스크립트입니다. 
* 각 디렉토리 - 프로젝트 형식으로 되어있습니다. 디렉토리 안에 파생 파일들을 모두 사용해야 정상 구동됩니다.
