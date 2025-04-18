export async function patch(url: string, body: any  ){
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        return {data: data, error: null}
    } catch (error) {
        return {data: null, error: error}
    }
    
}