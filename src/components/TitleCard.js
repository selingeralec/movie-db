import React from 'react';
import { Chip, Container, Paper, Typography } from '@material-ui/core';

function TitleCard({ title, genres, year, rating }) {
    return (
        <Paper style={{ padding: '20px' }}>
            <Container fixed>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h4" style={{ marginRight: 8 }}>
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" style={{ marginRight: 8 }}>
                            {year}
                        </Typography>
                        <Typography variant="h4" style={{ marginRight: 8 }}>
                            /
                        </Typography>
                        {genres.map((genre) => ( 
                            <Chip label={genre.name} style={{ marginRight: 5 }} /> )
                        )}
                    </div>
                        <Chip 
                            label={rating} 
                            variant="outlined"
                            size="medium"
                        />
                </div>
            </Container>
        </Paper>
    )
}

export default TitleCard
