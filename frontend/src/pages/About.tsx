import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--accent))_0%,_transparent_50%),linear-gradient(160deg,_hsl(var(--background))_0%,_hsl(var(--secondary))_45%,_hsl(var(--primary))_100%)] px-4 py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10">
        <div className="w-full">
          <Link to="/">
            <Button variant="outline">Back to home</Button>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <img src={logo} alt="Little Bunny's logo" className="h-20 w-20 object-contain" />
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">About us</p>
          <h1 className="text-4xl font-display font-bold text-foreground md:text-5xl">
            Little Bunny's
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            We design playful, comfortable dresses that let kids move, twirl, and shine. Each piece is made
            with soft fabrics, neat finishing, and attention to the little details that make an outfit feel
            special.
          </p>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-background/90 p-6 text-left shadow-lg">
            <h2 className="text-lg font-display font-semibold text-foreground">Crafted with care</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Every dress is stitched to be gentle on skin and strong enough for everyday adventures.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/90 p-6 text-left shadow-lg">
            <h2 className="text-lg font-display font-semibold text-foreground">Joyful design</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We blend classic silhouettes with playful colors so each outfit feels festive and fun.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/90 p-6 text-left shadow-lg">
            <h2 className="text-lg font-display font-semibold text-foreground">Made for memories</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              From celebrations to everyday moments, our dresses are designed to be worn and loved.
            </p>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-border/60 bg-background/90 p-6 text-left shadow-lg">
          <h2 className="text-xl font-display font-semibold text-foreground">Our promise</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            We focus on quality fabrics, comfortable fits, and delightful details. If you have a custom
            request or need help choosing a dress, we are happy to guide you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
