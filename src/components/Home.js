import Container from "./Container"
import Content from "./Content"
import Sidebar from "./Sidebar"
import Widgets from "./Widgets"

export function Home(){
    return(
        <Container>
            <Sidebar/>
            <Content/>
            <Widgets/>
        </Container>
    )
}; 
