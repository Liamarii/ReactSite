"use client"

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DatePickerWithPresets } from "@/custom-components/inputs/date-picker-with-presets";
import React, { useState } from "react";

function Home() {
    return (
        <>
            <ResultsTable tableItems={result} />
        </>
    );
}

interface TableData {
    username: string;
    startDate: Date;
    endDate: Date;
    project: string;
}

const result: TableData[] = [
    {
        username: 'Prickly Pete',
        startDate: new Date(`${new Date().getFullYear()}/01/01`),
        endDate: new Date(`${new Date().getFullYear() - 1}/01/03`),
        project: 'project name'
    },
    {
        username: 'Snoopy',
        startDate: new Date(`${new Date().getFullYear() - 1}/01/01`),
        endDate: new Date(`${new Date().getFullYear() - 1}/01/02`),
        project: 'project name'
    },
    {
        username: 'Egg',
        startDate: new Date(`${new Date().getFullYear() - 1}/01/01`),
        endDate: new Date(`${new Date().getFullYear() - 1}/01/02`),
        project: 'project name'
    }
];

const currentTime = () : string => {
    const now = new Date();
	const mins = now.getMinutes().toString().padStart(2,'0');
	const hours = now.getHours().toString().padStart(2,'0')
	return `${hours}:${mins}`
}

// const currentDate = (): string => {
//     const year = new Date().getUTCFullYear();
//     const month = (new Date().getUTCMonth() + 1).toString().padStart(2, '0');
//     const day = new Date().getUTCDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
// };

function ResultsTable({ tableItems }: { tableItems: TableData[] }) {	
    const [getFromDate, setFromDate] = useState<Date | undefined>();
    const [getToDate, setToDate] = useState<Date | undefined>();  
    const [getTimeFrom, setTimeFrom] = useState<string>();
    const [getTimeTo, setTimeTo] = useState<string>(currentTime());

    function handleToDateChange(date: Date | undefined){
		setToDate(date);
    };

    return (
        <>
            <div className="grid grid-rows-2 border border-solid p-2 w-fit rounded-sm m-2 text-sm bg-gray-300 border-black 1px dark:bg-gray-800 dark:border-white 1px">
                <div className="grid">
                    <label>From:</label>
                    <DatePickerWithPresets callback={setFromDate} />
                    <TableInputField useState={getTimeFrom} setState={setTimeFrom}/>
                </div>

                <div className="grid">
                    <label>To:</label>
                    <DatePickerWithPresets callback={handleToDateChange} />
                    <TableInputField useState={getTimeTo} setState={setTimeTo}/>
                </div>

                <Button 
                type="submit" 
                onClick={() => SubmitTest({fromDate: getFromDate, fromTime: getTimeFrom, toDate: getToDate, toTime: getTimeTo})}
                className="w-[280px]"
                >
                    Submit
                </Button>
            </div>

            <Table>
                <TableCaption>A list of your recent results.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tableItems.map((item: TableData) => (
                        <TableRow key={tableItems.indexOf(item)}>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.project}</TableCell>
                            <TableCell>{item.startDate.toLocaleDateString()}</TableCell>
                            <TableCell>{item.endDate.toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell>footer A</TableCell>
                        <TableCell>footer B</TableCell>
                        <TableCell>footer C</TableCell>
                        <TableCell>footer D</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
}

function TableInputField({ useState, setState }: { useState: string | undefined, setState: any }) {
    return (
        <input
            type="time"
            value={useState ?? "--:--"}
            onChange={(event) => setState(event.target.value)}
            className={InputFieldStyling()}
        />
    )
}

function InputFieldStyling() : string{
return 'items-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-[280px] justify-start text-left font-normal text-muted-foreground mt-2 mb-2'
}

function SubmitTest({fromDate, fromTime, toDate, toTime}: {fromDate : any, fromTime: any, toDate: any, toTime: any}){
alert(`
fromDate:\n${fromDate ?? "not set"}\n
fromTime:\n${fromTime ?? "not set"}\n
toDate:\n${toDate ?? "not set"}\n
toTime:\n${toTime ?? "not set"}
`);
}

export default Home;