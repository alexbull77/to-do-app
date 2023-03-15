import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {Box} from "@mui/material";

export default function EditWindow() {

    const [openEdit, setOpenEdit] = useState(false)

    const handleOpenEdit = () => setOpenEdit(true)
    const handleCloseEdit = () => setOpenEdit(false)

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    // expandIcon={<EditIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Box sx={{display: 'flex', alignItems: 'center', width: '50%'}}>
                        <Fab size="small" color="primary" aria-label="add-task" sx={{
                            display: 'flex',
                            marginRight: '20px'
                        }}
                             // onClick={handleClickOpen}
                        >
                            <AddIcon />
                        </Fab>
                        <Typography>Add Task</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion disabled>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>Disabled Accordion</Typography>
                </AccordionSummary>
            </Accordion>
        </div>
    );
}