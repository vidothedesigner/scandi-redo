import { PureComponent } from 'react';
import ArrowWhite from '../../images/ArrowWhite.svg'

class Gallery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentImg: 0,
            imageUrl: '' 
        };

        this.getImageUrl = this.getImageUrl.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getImageUrl(e) { this.setState({ imageUrl: e.target.src }) }

    handleClick(e) {
        const start = 0;
        let end = this.props.productGallery.length - 1;
        let current = this.state.currentImg;
        if(e.target.id === 'prev' && current !== start) current = current - 1;
        if(e.target.id === 'next' && current !== end) current = current + 1;
        this.setState({ currentImg: current, imageUrl: this.props.productGallery[current] })
     }

    render() { 
        let gallery = this.props.productGallery;
        console.log(this.props)
        return ( 
            <div className="producImages">
                { (!this.props.location && gallery.length > 1) && <div className="thumbnails">
                    { gallery.map((image, i) => {
                        return <img key={ i } src={ image } alt='' onClick={ this.getImageUrl } />
                    }) }
                </div> }
                <div className="largeImage">
                    <img src={ !this.state.imageUrl ? gallery[0] : this.state.imageUrl } alt='' />
                    { (this.props.location === 'inCart' && !this.props.isBag && gallery.length > 1) && <div className="galleryButtons">
                        <span id="prev" className="left" onClick={ (e) => this.handleClick(e) } ><img src={ ArrowWhite } alt="" /></span>
                        <span id="next" className="right" onClick={ (e) => this.handleClick(e) }><img src={ ArrowWhite } alt="" /></span>
                    </div>}
                </div>
            </div>
         );
    }
}
 
export default Gallery;