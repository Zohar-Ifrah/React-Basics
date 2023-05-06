export function AnimalsApp() {

    const animalInfos = [
        { id: 1, type: 'Malayan Tiger', count: 787 },
        { id: 2, type: 'Mountain Gorilla', count: 212 },
        { id: 3, type: 'Fin Whale', count: 28 },
    ]

    console.log('render')
    return (
        <div>
            <h2>Rare Animals</h2>
            <table>
                <thead>
                    <tr>
                        <th>Animal</th>
                        <th>Count</th>
                        <th>Google search</th>
                    </tr>
                </thead>
                <tbody>
                    {animalInfos.map(animal =>
                        <tr key={animal.id}>
                            <td>{animal.type}</td>
                            <td>{animal.count}</td>
                            <td><a href={`https://www.google.com/search?q=${animal.type}`}>Search</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}