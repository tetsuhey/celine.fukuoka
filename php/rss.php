<?php 
    date_default_timezone_set('Asia/Tokyo');
    header("Content-type: text/plain; charset=UTF-8");
     
    $url = "http://feedblog.ameba.jp/rss/ameblo/celine-fuk/rss20.xml";
    $rss =  simplexml_load_file($url);
    $output = '';
    $i = 0;
    // 取得件数
    $max = 5;
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
                    $thumbs = $item->description;
                    $output .= '<div class="row"><div class="col-12 col-md-6 offset-md-3">';
                        $output .= '<a href="'. $item->link .'" target="_blank">';
                            $output .= '<div class="d-flex">';
                                $output .= '<img src="'.$thumbs->img.'" alt="'.$item->title.'/>';
                                $output .= '<div>';
                                    $output .= '<time datetime="' . $item->pubDate . '">' . $date . '</time>';
                                    $output .= '<p class="blogtitle">'.$item->title.'</p>';
                                $output .= '</div>';
                            $output .= '</div>';
                        $output .= '</a>';
                    $output .= '</div></div>';
                    $i++;
                }
            }
            
        }
    }
     
    echo '<dl class="list">'. $output . '</dl>';
?>