import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function WeekTable() {
  const days = ["Mon", "Tue", "wed", "Thu", "Fri", "Sat"];
  return (
    <>
      <div>
        <TableContainer w={700}>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>No</Th>
                {days.map((day: string, index: number) => (
                  <Th key={index}>{day}</Th>
                ))}
                {/* <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Th>1</Th>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Th>2</Th>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Th>3</Th>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
              <Tr>
                <Th>4</Th>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
              <Tr>
                <Th>5</Th>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
              <Tr>
                <Th>6</Th>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
