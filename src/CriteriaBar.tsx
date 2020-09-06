import React from 'react'
import {Provider, defaultTheme} from '@adobe/react-spectrum';
import {Picker, Item} from '@adobe/react-spectrum'

type OptionType = {
    name: string
}
type CriteriaPropTypes = {
    gradeOptions: OptionType[],
    minGrade: string,
    setMinGrade: (minGrade: string) => {}
    maxGrade: string,
    setMaxGrade: (maxGrade: string) => {}
    radius: number,
    setRadius: (radius: number) => {}
    numProblems: number
    setNumProblems: (numProblems: number) => {}
}

const CriteriaBar = (props: CriteriaPropTypes) => {
    const {gradeOptions, minGrade, setMinGrade, maxGrade, setMaxGrade, radius, setRadius, numProblems, setNumProblems} = props
    return (
    <div className="justify-evenly m-auto">
        <Provider theme={defaultTheme}>
            <div>
                <label htmlFor="radius">Radius (Miles)</label>
                <input type="range" id="radius" name="radius"
                        min="1" max="200"
                        onChange={(selected) => setRadius(Number(selected.target.value))}
                />
                <span>{radius}</span>
            </div>
            <div>
                <label htmlFor="numProblems">Number of problems</label>
                <input type="range" id="numProblems" name="numProblems" value={numProblems}
                        min="1" max="500"
                        onChange={(selected) => setNumProblems(Number(selected.target.value))}
                />
                <span>{numProblems}</span>
            </div>
            <Picker
            label="Min Grade"
            items={gradeOptions}
            selectedKey={minGrade}
            onSelectionChange={(selected) => setMinGrade(selected)}>
            {(item) => { return item && item.name ? <Item key={item.name}>{item.name}</Item> : null}}
            </Picker>
            <Picker
            label="Max Grade"
            items={gradeOptions}
            selectedKey={maxGrade}
            onSelectionChange={(selected) => setMaxGrade(selected)}>
            {(item) => { return item && item.name ? <Item key={item.name}>{item.name}</Item> : null}}
            </Picker>
            <button>Search</button>
        </Provider>
    </div>
)}

export default CriteriaBar
