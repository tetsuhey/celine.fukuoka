<?php 

    /**
    * curl_get_contents
    * file_get_contentsの代替関数。
    * allow_url_fopen=off時にURLからファイル内容を取得する際に使用します
    * @param string $url
    * @param integer $timeout
    * @return string
    */
    function curl_get_contents( $url, $timeout=60 )
    {
        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_HEADER, false );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt( $ch, CURLOPT_TIMEOUT, $timeout );
        $result = curl_exec( $ch );
        curl_close( $ch );
        return $result;
    }

    
    date_default_timezone_set('Asia/Tokyo');

    $url = "http://rssblog.ameba.jp/celine-fuk/rss20.xml";     
    
    $rss =  simplexml_load_file($url);
    // $rss = curl_get_contents($url);
    // $rss = simplexml_load_string($rss);
    $i = 0;
    // 取得件数
    $max = 5;
    $output = '';
    


    if($rss){
        foreach( $rss->channel->item as $item )
        {
            /**
            * タイトル
            * $item->title ;
            * リンク
            * $item->link ;
            * 更新日時のUNIX TIMESTAMP
            * $timestamp = strtotime( $item->pubDate ) ;
            * 詳細
            * $item->description;
            */
             
            if(!preg_match('/^PR:/',$item->title )){
                if($i < $max){
                  $timestamp = strtotime( $item->pubDate );
                  $date = date( 'Y.m.d',$timestamp );
                  // 画像がなかった場合のデフォルト画像を指定しておきます
                  $now_url = (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
                //   $item->thumbnail = trim($now_url,"/") . "/res/noimage.jpg";
                $item->thumbnail = $now_url . "/res/noimage.jpg";

                  // 記事の中で最初に使われている画像を検索、設定する
                  if( preg_match_all('/<img(.+?)>/is', $item->description, $matches) ){
                    foreach( $matches[0] as $img ){
                        // $item->thumbnail = $img;
                        if( preg_match('/src=[\'"](.+?jpe?g)[\'"]/', $img, $m) ){
                            $item->thumbnail = $m[1];
                        }
                    }
                  }

                  $output .= '<div class="row"><div class="col-12 col-md-6 offset-md-3">';
                  $output .= '<a class="blogcont" href="'. $item->link .'" target="_blank">';
                  $output .= '<div class="d-flex">';
                  $output .= '<img class="blog_thumns" src="'.$item->thumbnail.'" alt="'.$item->title.'" />';
                  $output .= '<div>';
                  $output .= '<time datetime="' . $item->pubDate . '">' . $date . '</time>';
                  $output .= '<p class="blogtitle">'.$item->title.'</p>';
                  $output .= '<p class="godetail">この記事を読む</p>';
                  $output .= '</div>';
                  $output .= '</div>';
                  $output .= '</a>';
                  $output .= '</div></div>';
                  $i++;
                }
            }
            
        }
        $output .= '<div class="row"><div class="col-12 col-md-6 offset-md-3 center">';
        $output .= '<a class="more btn" href="https://ameblo.jp/celine-fuk/entrylist.html" target="_blank">すべての記事へ</a>';
        $output .= '</div></div>';
    }else{
        $output .= '<div class="row"><div class="col-12 center">記事が見つかりませんでした。</div></div>';
    }
    echo $output;



    function get_rss($url, $limit=5)
    {
        $rss = curl_get_contents($url);
        $rss = simplexml_load_string($rss);
        $results = array();

        foreach( $rss->channel->item as $item ){

            // PR: から始まる広告、指定数以上の記事は除く
            if( preg_match("/^PR:.+/",$item->title) || ($limit >= 0 && count($results) >= $limit) ){
                continue;
            }

            $timestamp = strtotime( $item->pubDate );
            $item->date = date( 'Y.m.d',$timestamp );

            // 画像がなかった場合のデフォルト画像を指定しておきます
            $now_url = (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
            $item->thumbnail = trim($now_url,"/") . "/res/noimage.jpg";

            // 記事の中で最初に使われている画像を検索、設定する
            if( preg_match_all('/<img(.+?)>/is', $item->description, $matches) ){
                foreach( $matches[0] as $img ){
                    if( preg_match('/src=[\'"](.+?jpe?g)[\'"]/', $img, $m) ){
                        $item->thumbnail = $m[1];
                    }
                }
            }

            // レスポンス用のPHPへのパスへ設定する
            $data = array("f" => (string)$item->thumbnail);
            $item->thumbnail = sprintf("response.php?%s", http_build_query($data));

            $results[] = $item;
        }

        return $results;
    }
?>