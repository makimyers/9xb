interface AuthorProps {
    firstname: string;
    lastname: string;
  }
  
  export default function Author({ firstname, lastname }: AuthorProps) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        By {firstname} {lastname}
      </div>
    );
  }