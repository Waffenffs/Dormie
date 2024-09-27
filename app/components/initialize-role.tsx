import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

// Animate UP to the center of the screen
export default function RoleCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome to Dormie!</CardTitle>
                <CardDescription>What's your role as a user? :)</CardDescription>
            </CardHeader>
            <CardContent>
                Hi
                {/* add dropdown menu here */}
            </CardContent>
            <CardFooter>
                {/* add complete/finish button here */}
            </CardFooter>
        </Card>
    )
} 