
## Technical Details
- **Backend**: FastAPI
- **Frontend**: ReactJS, NextUI

## API Limitations and Configuration Flag

The original API used for fetching mutual funds data encountered several issues:
- **Unreliable Service**: The API often experienced downtime and returned HTTP 521 errors.
- **Restricted Quota**: The API had a very limited monthly quota, which was quickly exhausted during testing.

To ensure a smooth demonstration and reliable user experience, a copy of the data was created based on the available API responses and mocked using RapidAPI.

### Sample Data Mode

To facilitate testing without needing API credentials, a configuration flag `USE_SAMPLE_DATA` is provided. This flag is set to `true` in the Docker Compose setup, ensuring that the application uses sample data instead of making live API calls.

- **Sample Data**: When `USE_SAMPLE_DATA` is set to `true`, the application uses pre-loaded sample data.
- **ITI Mutual Fund**: Specifically, the sample data includes details for the fund family "ITI Mutual Fund", allowing you to test and interact with the application effectively.

This setup allows for seamless testing and demonstration, bypassing the issues associated with the unreliable API service.

## Running Locally with Docker Compose

To make it easy to run the project locally for demonstration purposes, a Docker Compose configuration is included. Ensure that Docker and Docker Compose are already installed on your system. If they are, you can start the application using the following command:

```bash
docker compose up
```

Once the application is running:
- Backend API Documentation: Access the API documentation at http://localhost:8000/docs.
- Frontend Interface: View the application at http://localhost:3000.

For testing the app, use the following demo credentials:
- Username: demo
- Password: demo123
