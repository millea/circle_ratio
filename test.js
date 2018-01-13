
//数値
var pi    = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
var root2 = "1.4142135623730950488016887242096980785696718753769480731766797379907324784621070388503875343276415727";
var root3 = "1.7320508075688772935274463415058723669428052538103806280558069794519330169088000370811461867572485756";
var root5 = "2.2360679774997896964091736687312762354406183596115257242708972454105209256378048994144144083787822749";
var nl    = "2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274";

var count_best = 0;//ベストスコア
var count_ok = 0;//OK数
var count_ng = 0;//NG数
var count_keta = 0;//次の桁

var text_best = document.getElementById('best');
var text_ok = document.getElementById('oknum');
var text_ng = document.getElementById('ngnum');
var msg = document.getElementById('msg');
var msgtext = document.getElementById('msgnext');
var text_history = document.getElementById('inputted');

//document.cookie = "best=999";
text_best.textContent = "BEST:" + Number(GetCookie("best"));
count_best = Number(GetCookie("best"));

inputtitle.textContent = "円周率" + 2 + "桁目は？";

//キーボード入力
document.onkeydown = function (e){

	//最後まで正解済
	if(count_ok >= pi.length-2)
	{
		return;
	}

	//入力したキーコード
	var key = e.key;

	//正解
  if(key == pi[2+count_ok])
  {
		//正解アクション
		msg.textContent = key;
		setTimeout("ActionOK()", 1000);
		//正解カウント
    count_ok++;
    text_ok.textContent = "OK:" + count_ok;

		//履歴に出力
    text_history.textContent = text_history.textContent + key;
		count_keta = count_ok + 2;
		inputtitle.textContent = "円周率" + count_keta + "桁目は？";
    //ベスト更新
    if(count_ok + 1 > count_best)
    {
      document.cookie = "best=" + count_ok;
      text_best.textContent = "BEST:" + Number(GetCookie("best"));
    }
    //最後まで正解
    if(count_ok >= pi.length-2)
    {
      msg.textContent = "すごい！";
    }
  }
	//不正解
  else if(key == '1'||key == '2'||key == '3'||
      key == '4'||key == '5'||key == '6'||
      key == '7'||key == '8'||key == '9'||
      key == '0')
  {
		//不正解アクション
		msg.textContent = key;
		setTimeout("ActionNG()", 1000);
		//不正解カウント
    count_ng++;
    text_ng.textContent = "NG:" + count_ng;
  }
	//数字以外
  else
  {
    msg.textContent = "数値を入力してください。";
  }

};

//OKアクション
function ActionOK()
{
	msg.textContent = "正解！";
}

//NGアクション
function ActionNG()
{
	msg.textContent = "はずれ！";
}

/**
 * 指定したcookieの値を取得
 */
function GetCookie( name )
{
    var result = null;

    var cookieName = name + '=';
    var allcookies = document.cookie;

    var position = allcookies.indexOf( cookieName );
    if( position != -1 )
    {
        var startIndex = position + cookieName.length;

        var endIndex = allcookies.indexOf( ';', startIndex );
        if( endIndex == -1 )
        {
            endIndex = allcookies.length;
        }

        result = decodeURIComponent(
            allcookies.substring( startIndex, endIndex ) );
    }

    return result;
}

// ------------------------------------------------------------
// イベントのリッスンを開始する
// ------------------------------------------------------------
// イベントリスナーに対応している
// if(document.addEventListener){
//
// 	// キーボードを押したときに実行されるイベント
// 	document.addEventListener("keydown" , KeyDownFunc);
//
// // アタッチイベントに対応している
// }else if(document.attachEvent){
//
// 	// キーボードを押したときに実行されるイベント
// 	document.attachEvent("onkeydown" , KeyDownFunc);
//
// }

//var val = getUrlVars();

/**
 * URL解析して、クエリ文字列を返す
 * @returns {Array} クエリ文字列
 */
function getUrlVars()
{
    var vars = [], max = 0, hash = "", array = "";
    var url = window.location.search;

        //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
    hash  = url.slice(1).split('&');
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');    //keyと値に分割。
        vars.push(array[0]);    //末尾にクエリ文字列のkeyを挿入。
        vars[array[0]] = array[1];    //先ほど確保したkeyに、値を代入。
    }

    return vars;
}
