import { PureComponent } from 'react';

class Attributes extends PureComponent {
    constructor(props) {
        super(props);
        this.selection = this.selection.bind(this);
        this.addClasses = this.addClasses.bind(this);
    }

    selection(e) {
        let { getSelectedItems } = this.props;
        if(this.props.location === 'inCart' || this.props.isBag === 'isBag') return;

        e.target.parentNode.childNodes.forEach(node => { if(node.classList.contains('selected')) node.classList.remove('selected') });
        e.target.classList.add('selected');
        let selected = Array.from(e.target.parentNode.childNodes).filter(selected => selected.classList.contains('selected'));
        getSelectedItems && getSelectedItems(selected[0].attributes[0].value,selected[0].textContent);
    }

    displayAttributes(attributes) {
        return attributes.map((attribute, index) => (
            <div key={ index } className={ this.props.isBag ? 'bagAttributeContainer' : 'attributeContainer' }>
                <h3 className="attributeHeading">{ attribute.name + ':' }</h3>
                <div className="attributeSelection">
                    { attribute.items.map((item, index) => {
                        return (
                            <span 
                            key={ index } 
                            datatest={ attribute.id }
                            className={ this.addClasses(attribute.type, attribute.id, item.value, this.props.preSelection) } 
                            style={ attribute.type === 'swatch' ? { backgroundColor: `${item.value}` } : {} }
                            onClick={ this.selection }>
                                { item.value }
                            </span>
                        );
                    }) }
                </div>
            </div>
        ));
    }
    addClasses(att, attId, itemValue, selection = undefined) {
        let classes;
        classes = att === 'swatch' ? 'swatchAttribute' : 'textAttribute';
        selection && Object.entries(selection).forEach(select => select[0] === attId && select[1] === itemValue ? classes = classes + ' selected' : classes)
        return classes;
    }

    render() { 
        let attributes = this.props.productAttributes;
        return ( 
        <>
            { this.displayAttributes(attributes.filter(attr => attr.type === 'text')) }
            { this.displayAttributes(attributes.filter(attr => attr.type === 'swatch')) }
        </> 
        );
    }
}
 
export default Attributes;