import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import copy from 'copy-to-clipboard';

const ShareButton = ({movie}) => {
    const shareMovie = async () => {
        const origin = window.location.origin;

        const shareData = {
            title: 'EFDB: EfeMovieDatabase',
            text: `${movie.title} isimli filme göz atmalısın!`,
            url: `${origin}/film-detay/${movie._id}`,
        }

        try {
            await navigator.share(shareData);
        } catch{
            copy(shareData.url);
            alert('Panoya kopyalandı!');
        }
    };

    return(
        <Button size="small" color="primary" onClick={shareMovie}>
            <ShareIcon/>
            Paylaş
        </Button>
    )
}

export default ShareButton;