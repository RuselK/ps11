import asyncio
import typer

from src.db import Base, create_db_and_tables, drop_all_tables  # noqa
from src.users.models import User  # noqa
from src.posts.models import Post, PostView  # noqa
from src.users.utils import create_superuser


app = typer.Typer(
    help="CLI for initializing the FastAPI app database and superuser."
)


@app.command("init-db")
def init_db_command():
    """
    Create the database tables.
    """
    try:
        typer.echo(
            "[INFO] Initializing database tables..."
        )
        asyncio.run(create_db_and_tables())
        typer.echo(
            "[SUCCESS] Database tables have been created."
        )
    except Exception as e:
        typer.echo(f"[ERROR] Failed to create database tables: {e}", err=True)
        raise typer.Exit(code=1)


@app.command("drop-db")
def drop_db_command():
    """
    Drop all tables in the database.
    """
    try:
        typer.echo("[INFO] Dropping all tables...")
        asyncio.run(drop_all_tables())
        typer.echo("[SUCCESS] All tables have been dropped.")
    except Exception as e:
        typer.echo(f"[ERROR] Failed to drop all tables: {e}", err=True)
        raise typer.Exit(code=1)


@app.command("create-superuser")
def create_superuser_command():
    """
    Create a superuser if one does not exist.
    """
    try:
        typer.echo("[INFO] Creating superuser...")
        asyncio.run(create_superuser())
        typer.echo("[SUCCESS] Superuser has been created.")
    except Exception as e:
        typer.echo(
            f"[ERROR] Failed to create superuser: {e}", err=True
        )
        raise typer.Exit(code=1)


@app.command("init")
def init_all_command():
    """
    Initialize the database and create the superuser in a single event loop.
    """
    async def main():
        typer.echo(
            "[INFO] Starting full initialization: "
            "database tables and superuser."
        )
        await create_db_and_tables()
        typer.echo("[INFO] Database initialization complete.")
        await create_superuser()
        typer.echo("[INFO] Superuser initialization complete.")

    try:
        asyncio.run(main())
        typer.echo(
            "[SUCCESS] Initialization complete: "
            "database tables and superuser are set up."
        )
    except Exception as e:
        typer.echo(f"[ERROR] Initialization failed: {e}", err=True)
        raise typer.Exit(code=1)


if __name__ == "__main__":
    app()
