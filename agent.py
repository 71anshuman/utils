import os
import asyncio
from google.antigravity import Agent, LocalAgentConfig
from google.antigravity.types import TemplatedSystemInstructions

def list_developer_tools() -> str:
    """Lists all the available developer utility tools in the codebase.
    
    Returns a string containing the names of all the components under src/components/.
    """
    components_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src', 'components')
    if not os.path.exists(components_dir):
        return "Could not find src/components directory."
    try:
        tools = [name for name in os.listdir(components_dir) if os.path.isdir(os.path.join(components_dir, name))]
        return "Available tools:\n" + "\n".join(f"- {tool}" for tool in sorted(tools))
    except Exception as e:
        return f"Error listing tools: {str(e)}"

def read_tool_source_code(tool_name: str) -> str:
    """Reads the source code of a developer utility tool in src/components/.
    
    Args:
        tool_name: The folder name of the tool (e.g. 'sip-calculator', 'ip-lookup').
    """
    components_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src', 'components')
    tool_dir = os.path.join(components_dir, tool_name)
    if not os.path.exists(tool_dir):
        return f"Tool '{tool_name}' not found."
    
    try:
        files = os.listdir(tool_dir)
        js_files = [f for f in files if f.endswith('.js') or f.endswith('.jsx')]
        if not js_files:
            return f"No JS/JSX files found in {tool_dir}."
        
        source_content = []
        for file in sorted(js_files):
            file_path = os.path.join(tool_dir, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            source_content.append(f"--- File: {file} ---\n{content}\n")
        return "\n".join(source_content)
    except Exception as e:
        return f"Error reading source code for {tool_name}: {str(e)}"

# Setup config
config = LocalAgentConfig(
    system_instructions=TemplatedSystemInstructions(
        identity="You are the Developer Utilities Agent. You help developers understand, query, and manage the developer utilities React application."
    ),
    tools=[list_developer_tools, read_tool_source_code]
)

async def main():
    async with Agent(config) as agent:
        print("Initializing Developer Utilities Agent...")
        print("Type 'exit' or 'quit' to end.")
        await agent.run_interactive_loop()

if __name__ == '__main__':
    asyncio.run(main())
