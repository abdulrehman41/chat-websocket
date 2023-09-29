import { WebSocketServer } from 'ws';
import axios from 'axios';
const wss = new WebSocketServer({ port: 8080 });

console.log('websocket ready on port 8080');


wss.on('connection', function connection(ws) {
    ws.on('message', async function message(data) {
        try {
            const receivedData = JSON.parse(data);

            const apiResponse = await makeApiCall(receivedData);

            ws.send(JSON.stringify(apiResponse));

            // Perform operations with the received data
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
});

async function makeApiCall(data) {
    try {
        // Make an API call using axios or another HTTP library
        const response = await axios.post('http://16.170.201.181:5001/api/send-message', data);

        // Return the API response data
        return response.data;
    } catch (error) {
        // Handle API call errors here
        console.error('API Error:', error);
        return { error: 'API call failed' };
    }
}

