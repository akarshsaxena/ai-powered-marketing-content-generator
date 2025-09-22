import nabLogo from '/nab-logo.png';

const header = () => (
    <header style = {{ display : 'flex' ,alignItems: 'center' , padding : '10px 20px' , boxShadow : '0 2px 4px rgba(0,0,0,0.1)' , marginBottom : '20px' }}>
        <img src = {nabLogo} alt = "nab-logo" style ={{ height : '40px' , marginRight : '10px' }} />
    </header>
)

export default header;