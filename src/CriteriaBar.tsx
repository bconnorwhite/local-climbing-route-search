import React from 'react'
import {Provider, defaultTheme} from '@adobe/react-spectrum';
import {Picker, Item} from '@adobe/react-spectrum'

type OptionType = {
    name: string
}
type CriteriaPropTypes = {
    radiusOptions: OptionType[],
    radius: string,
    setRadius: (radius: string) => {}
}

const CriteriaBar = (props: CriteriaPropTypes) => {
    const {radiusOptions, radius, setRadius} = props
    return (
    <div className="justify-evenly m-auto">
        <Provider theme={defaultTheme}>
            <div>
                <label htmlFor="radius">Radius (Miles)</label>
                <input type="range" id="radius" name="radius"
                        min="1" max="200"/>
            </div>
            <Picker
            label="Min Grade"
            items={radiusOptions}
            selectedKey={radius}
            onSelectionChange={(selected) => setRadius(selected)}>
            {(item) => { return item && item.name ? <Item key={item.name}>{item.name}</Item> : null}}
            </Picker>
            <Picker
            label="Max Grade"
            items={radiusOptions}
            selectedKey={radius}
            onSelectionChange={(selected) => setRadius(selected)}>
            {(item) => { return item && item.name ? <Item key={item.name}>{item.name}</Item> : null}}
            </Picker>
        </Provider>
    </div>
)}

export default CriteriaBar
