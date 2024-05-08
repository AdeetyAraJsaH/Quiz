import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function TableComponent({ quizData }) {

    return (
        <Table color='warning' layout='auto' isStriped aria-label="Example static collection table">
            <TableHeader >
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>DIFFICULTY</TableColumn>
                <TableColumn>QUESTIONS</TableColumn>
                <TableColumn>SCORE</TableColumn>
                <TableColumn>SUBMITION</TableColumn>
            </TableHeader>
            {!quizData ?
                <TableBody emptyContent={"No rows to display."}>{[]}</TableBody> :
                <TableBody>
                    {Object.entries(quizData).map(([key, value], index) => (
                        <TableRow key={index}>
                            <TableCell>{value.Details.categoryName}</TableCell>
                            <TableCell>{value.Details.difficulty}</TableCell>
                            <TableCell>{value.Details.amount}</TableCell>
                            <TableCell>{value.Result.score}/{value.Result.totalscore}</TableCell>
                            <TableCell>{key}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            }
        </Table>
    );
}
