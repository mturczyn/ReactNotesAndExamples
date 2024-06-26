import { FixedSizeList as List, ListChildComponentProps } from 'react-window'

const items = [...Array(1000).keys()]

function ItemCard({ itemNo }: { itemNo: number }) {
    console.log('>>>', 'rendering item no.', itemNo)
    return (
        <li
            key={itemNo}
            style={{
                height: '2rem',
                borderBottom: '1px solid black',
                margin: '1px',
            }}
        >
            <span style={{ fontWeight: 'bolder' }}>
                This is item number {itemNo}.
            </span>{' '}
            And list goes on and on and on.
        </li>
    )
}

export default function VirtualizedList() {
    return (
        <>
            <h1>Virtualization</h1>
            <p>
                Below we present list that renders only visible items, check
                console logs to see that in action. Library used{' '}
                <code>react-window</code>.
            </p>
            <List
                height={500}
                itemCount={items.length}
                itemSize={35}
                width={500}
            >
                {({ index }: ListChildComponentProps<any>) => (
                    <ItemCard itemNo={index} />
                )}
            </List>
        </>
    )
}
