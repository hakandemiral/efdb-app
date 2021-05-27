import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

const ShareButton = ({movie}) => {
    const [isCopied, setIsCopied] = useState(false);
    const shareMovie = () => {
        const origin = window.location.origin;

        const shareData = {
            title: 'EFDB: EfeFilmDatabase',
            text: `EFDB'de ${movie.title} isimli filme göz atmalısın!`,
            url: `${origin}/film-detay/${movie._id}`,
        }

        try {
            navigator.share(shareData);
        }catch(err){
            copy(shareData.url, {
                message: 'Tarayıcın paylaşımı ve panoya kopyalamayı desteklemiyor, buradan linki kopyalabilirsin.'
            });
            setIsCopied(true);
            setTimeout(()=> {
            setIsCopied(false);
            }, 1500)
        }
    };

    return(
        <Button size="small" color="primary" onClick={shareMovie}>
            <ShareIcon/>
            {isCopied ? <div style={{fontSize: 7.5}}>Kopyalandı</div> :"Paylaş"}
        </Button>
    )
}

export default ShareButton;