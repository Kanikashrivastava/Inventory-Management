const API_BASE_URL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com';

export const fetchInventories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};