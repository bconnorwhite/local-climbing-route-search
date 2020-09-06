import React from 'react'
import {Provider, defaultTheme, Picker, Item, Button} from '@adobe/react-spectrum'

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
            <div className="flex p-4 justify-evenly bg-gray-400 text-blue-500 items-center">
                <div className="flex flex-col justify-center items-start">
                    <div className="flex">
                        <label htmlFor="radius">Radius (Miles)</label>
                        <input type="range" id="radius" name="radius"
                                min="1" max="200"
                                onChange={(selected) => setRadius(Number(selected.target.value))}
                        />
                        <span>{radius}</span>
                    </div>
                    <div className="flex">
                        <label htmlFor="numProblems">Number of problems</label>
                        <input type="range" id="numProblems" name="numProblems" value={numProblems}
                                min="1" max="500"
                                onChange={(selected) => setNumProblems(Number(selected.target.value))}
                        />
                        <span>{numProblems}</span>
                    </div>
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
                <Button variant="cta" onPress={() => {}}>Search</Button>
            </div>
        </Provider>
    </div>
)}

export default CriteriaBar
